import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  // Allow API routes and static files to pass through
  if (pathname.startsWith('/api') || pathname.startsWith('/_next/static') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Routes that don't require authentication
  const publicPaths = ['/', '/login', '/register'];

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  let userRole: string | undefined;

  // Function to clear cookies and redirect to login
  const redirectToLogin = () => {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  };

  // Try to verify accessToken or refresh if expired
  if (accessToken) {
    try {
      const verifyResponse = await fetch(`${backendUrl}/api/auth/verify`, {
        headers: {
          'Cookie': `accessToken=${accessToken}`,
        },
      });

      if (verifyResponse.ok) {
        const data = await verifyResponse.json();
        userRole = data.user.role;
      } else if (verifyResponse.status === 403 && refreshToken) {
        // If Access token expired/invalid, try to refresh
        const refreshResponse = await fetch(`${backendUrl}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `refreshToken=${refreshToken}`,
          },
        });

        if (refreshResponse.ok) {
          // Backend will set new cookies, so just proceed
          const data = await refreshResponse.json();
          userRole = data.role;
          // Update accessToken in middleware context if needed for subsequent checks
          accessToken = request.cookies.get('accessToken')?.value; 
        } else {
          return redirectToLogin();
        }
      } else {
        return redirectToLogin();
      }
    } catch (error) {
      console.error('Error during token verification/refresh:', error);
      return redirectToLogin();
    }
  } else if (refreshToken) {
    // No accessToken, but refreshToken exists, try to refresh
    try {
      const refreshResponse = await fetch(`${backendUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `refreshToken=${refreshToken}`,
        },
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        userRole = data.role;
        // Update accessToken in middleware context if needed for subsequent checks
        accessToken = request.cookies.get('accessToken')?.value; 
      } else {
        return redirectToLogin();
      }
    } catch (error) {
      console.error('Error during initial refresh attempt:', error);
      return redirectToLogin();
    }
  }

  // If no valid token (accessToken or successfully refreshed), and trying to access protected path
  if (!accessToken && !publicPaths.includes(pathname)) {
    return redirectToLogin();
  }

  // If authenticated user tries to access login or register, redirect to their dashboard
  if (accessToken && userRole && publicPaths.includes(pathname)) {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else if (userRole === 'agent') {
      return NextResponse.redirect(new URL('/agent/dashboard', request.url));
    }
  }

  // Role-based access control for dashboard routes
  if (accessToken && userRole) {
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/agent/dashboard', request.url));
    }
    if (pathname.startsWith('/agent') && userRole !== 'agent') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)?'],
};