#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# ENV=$1
ENV=$1
ENV_FILE=$DIR/.env.$ENV
ENV_CONFIG_JS=$DIR/env-config.js

# Recreate config file
rm -rf $ENV_CONFIG_JS
touch $ENV_CONFIG_JS

# Add assignment 
echo "window._env_ = {" >> $ENV_CONFIG_JS

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi


  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> $ENV_CONFIG_JS
done < $ENV_FILE

echo "}" >> $ENV_CONFIG_JS