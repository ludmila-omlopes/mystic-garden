import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useTheme } from 'next-themes';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation'; 
import { getApiEndpoint } from '@/lib/apiEndpoints';

type ProfileResponse = {
  token_id: string;
  local_name: string;
};

type OptionType = {
    label: string;
    value: string;
  };

function SearchProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<ProfileResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const { theme } = useTheme();
  const isMounted = useRef(false);
  const router = useRouter();


  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current || !router) {
      return;
    }

    if (selectedOption) {
      router.push(`/${selectedOption.label}`);
    }
  }, [selectedOption]);


  const fetchProfiles = async (handle, callback, errorCallback) => {
    if (!handle) return; 
    try {
      const url = getApiEndpoint('listProfileIdsLikeHandle');
        const response = await fetch(url + `?handle=${encodeURIComponent(handle)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.result) {
            const parsedData = JSON.parse(data.result);
            callback(parsedData); 
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error: any) {
        console.error('Error fetching profiles:', error);
        errorCallback(error.message); 
    }
  };

  const debouncedFetchProfiles = debounce(fetchProfiles, 500);

const darkThemeStyles = {
    control: styles => ({ ...styles, backgroundColor: 'black' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
        ? 'darkblue'
        : isFocused
        ? 'lightgray'
        : 'black', 
      color: 'white', 
      };
    },
    input: styles => ({ ...styles, color: 'lightgray' }), 
    menu: (provided, state) => ({
        ...provided,
        width: 'auto', 
        overflow: 'visible', 
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition, color: 'darkgray' };
      }
  };
  
  const lightThemeStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? 'blue'
          : isFocused
          ? 'lightgray'
          : null,
        color: 'black',
      };
    },
    menu: (provided, state) => ({
        ...provided,
        width: 'auto', 
        overflow: 'visible', 
      }),
  };
  

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      console.log(themeStyles);
      setError('');
      debouncedFetchProfiles(searchTerm, profiles => {
        setProfiles(profiles);
        setLoading(false);
      }, error => {
        setError(error);
        setLoading(false);
      });
    } else {
      setProfiles([]); 
    }
    return () => debouncedFetchProfiles.cancel();
  }, [searchTerm]);

  const handleChange = (option) => {
    setSelectedOption(option);
    router.push(`/${option.label}`); 
  };

  const options = profiles.map(profile => ({
    value: profile.token_id,
    label: profile.local_name,
  }));

  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Search a profile..."
      onInputChange={value => setSearchTerm(value)}
      isLoading={loading}
      styles={themeStyles}
      onMenuOpen={() => setSelectedOption(null)} 
    />
  );
}

export default SearchProfiles;
