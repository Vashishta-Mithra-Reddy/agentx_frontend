"use client";

import React from 'react';

interface Country {
  countryCode: string;
  value: string;
  label: string;
}

interface CountryCodeSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const countries: Country[] = [
  { countryCode: "IN", value: "91", label: "India (+91)" },
  { countryCode: "US", value: "1", label: "USA (+1)" },
  { countryCode: "DZ", value: "213", label: "Algeria (+213)" },
  { countryCode: "AD", value: "376", label: "Andorra (+376)" },
  { countryCode: "AO", value: "244", label: "Angola (+244)" },
  { countryCode: "AI", value: "1264", label: "Anguilla (+1264)" },
  { countryCode: "AG", value: "1268", label: "Antigua & Barbuda (+1268)" },
  { countryCode: "AR", value: "54", label: "Argentina (+54)" },
  { countryCode: "AM", value: "374", label: "Armenia (+374)" },
  { countryCode: "AW", value: "297", label: "Aruba (+297)" },
  { countryCode: "AU", value: "61", label: "Australia (+61)" },
  { countryCode: "AT", value: "43", label: "Austria (+43)" },
  { countryCode: "AZ", value: "994", label: "Azerbaijan (+994)" },
  { countryCode: "BS", value: "1242", label: "Bahamas (+1242)" },
  { countryCode: "BH", value: "973", label: "Bahrain (+973)" },
  { countryCode: "BD", value: "880", label: "Bangladesh (+880)" },
  { countryCode: "BB", value: "1246", label: "Barbados (+1246)" },
  { countryCode: "BY", value: "375", label: "Belarus (+375)" },
  { countryCode: "BE", value: "32", label: "Belgium (+32)" },
  { countryCode: "BZ", value: "501", label: "Belize (+501)" },
  { countryCode: "BJ", value: "229", label: "Benin (+229)" },
  { countryCode: "BM", value: "1441", label: "Bermuda (+1441)" },
  { countryCode: "BT", value: "975", label: "Bhutan (+975)" },
  { countryCode: "BO", value: "591", label: "Bolivia (+591)" },
  { countryCode: "BA", value: "387", label: "Bosnia Herzegovina (+387)" },
  { countryCode: "BW", value: "267", label: "Botswana (+267)" },
  { countryCode: "BR", value: "55", label: "Brazil (+55)" },
  { countryCode: "BN", value: "673", label: "Brunei (+673)" },
  { countryCode: "BG", value: "359", label: "Bulgaria (+359)" },
  { countryCode: "BF", value: "226", label: "Burkina Faso (+226)" },
  { countryCode: "BI", value: "257", label: "Burundi (+257)" },
  { countryCode: "KH", value: "855", label: "Cambodia (+855)" },
  { countryCode: "CM", value: "237", label: "Cameroon (+237)" },
  { countryCode: "CA", value: "1", label: "Canada (+1)" },
  { countryCode: "CV", value: "238", label: "Cape Verde Islands (+238)" },
  { countryCode: "KY", value: "1345", label: "Cayman Islands (+1345)" },
  { countryCode: "CF", value: "236", label: "Central African Republic (+236)" },
  { countryCode: "CL", value: "56", label: "Chile (+56)" },
  { countryCode: "CN", value: "86", label: "China (+86)" },
  { countryCode: "CO", value: "57", label: "Colombia (+57)" },
  { countryCode: "KM", value: "269", label: "Comoros (+269)" },
  { countryCode: "CG", value: "242", label: "Congo (+242)" },
  { countryCode: "CK", value: "682", label: "Cook Islands (+682)" },
  { countryCode: "CR", value: "506", label: "Costa Rica (+506)" },
  { countryCode: "HR", value: "385", label: "Croatia (+385)" },
  { countryCode: "CU", value: "53", label: "Cuba (+53)" },
  { countryCode: "CY", value: "357", label: "Cyprus South (+357)" },
  { countryCode: "CZ", value: "42", label: "Czech Republic (+42)" },
  { countryCode: "DK", value: "45", label: "Denmark (+45)" },
  { countryCode: "DJ", value: "253", label: "Djibouti (+253)" },
  { countryCode: "DM", value: "1809", label: "Dominica (+1809)" },
  { countryCode: "DO", value: "1809", label: "Dominican Republic (+1809)" },
  { countryCode: "EC", value: "593", label: "Ecuador (+593)" },
  { countryCode: "EG", value: "20", label: "Egypt (+20)" },
  { countryCode: "SV", value: "503", label: "El Salvador (+503)" },
  { countryCode: "GQ", value: "240", label: "Equatorial Guinea (+240)" },
  { countryCode: "ER", value: "291", label: "Eritrea (+291)" },
  { countryCode: "EE", value: "372", label: "Estonia (+372)" },
  { countryCode: "ET", value: "251", label: "Ethiopia (+251)" },
  { countryCode: "FK", value: "500", label: "Falkland Islands (+500)" },
  { countryCode: "FO", value: "298", label: "Faroe Islands (+298)" },
  { countryCode: "FJ", value: "679", label: "Fiji (+679)" },
  { countryCode: "FI", value: "358", label: "Finland (+358)" },
  { countryCode: "FR", value: "33", label: "France (+33)" },
  { countryCode: "GF", value: "594", label: "French Guiana (+594)" },
  { countryCode: "PF", value: "689", label: "French Polynesia (+689)" },
  { countryCode: "GA", value: "241", label: "Gabon (+241)" },
  { countryCode: "GM", value: "220", label: "Gambia (+220)" },
  { countryCode: "GE", value: "7880", label: "Georgia (+7880)" },
  { countryCode: "DE", value: "49", label: "Germany (+49)" },
  { countryCode: "GH", value: "233", label: "Ghana (+233)" },
  { countryCode: "GI", value: "350", label: "Gibraltar (+350)" },
  { countryCode: "GR", value: "30", label: "Greece (+30)" },
  { countryCode: "GL", value: "299", label: "Greenland (+299)" },
  { countryCode: "GD", value: "1473", label: "Grenada (+1473)" },
  { countryCode: "GP", value: "590", label: "Guadeloupe (+590)" },
  { countryCode: "GU", value: "671", label: "Guam (+671)" },
  { countryCode: "GT", value: "502", label: "Guatemala (+502)" },
  { countryCode: "GN", value: "224", label: "Guinea (+224)" },
  { countryCode: "GW", value: "245", label: "Guinea - Bissau (+245)" },
  { countryCode: "GY", value: "592", label: "Guyana (+592)" },
  { countryCode: "HT", value: "509", label: "Haiti (+509)" },
  { countryCode: "HN", value: "504", label: "Honduras (+504)" },
  { countryCode: "HK", value: "852", label: "Hong Kong (+852)" },
  { countryCode: "HU", value: "36", label: "Hungary (+36)" },
  { countryCode: "IS", value: "354", label: "Iceland (+354)" },
  { countryCode: "ID", value: "62", label: "Indonesia (+62)" },
  { countryCode: "IR", value: "98", label: "Iran (+98)" },
  { countryCode: "IQ", value: "964", label: "Iraq (+964)" },
  { countryCode: "IE", value: "353", label: "Ireland (+353)" },
  { countryCode: "IL", value: "972", label: "Israel (+972)" },
  { countryCode: "IT", value: "39", label: "Italy (+39)" },
];

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        id="countryCode"
        name="countryCode"
        className="w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none appearance-none"
        value={value}
        onChange={onChange}
        required
        aria-label="Country Code"
      >
        {countries.map((country) => (
          <option key={country.countryCode} value={country.value} defaultValue={91} data-countrycode={country.countryCode}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryCodeSelect;
