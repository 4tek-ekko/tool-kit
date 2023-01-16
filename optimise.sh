#!/bin/bash
# Optimise project template
# Path: template/optimise.sh
# Usage: ./optimise.sh
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
SHOW_WARNING_ONLY=${1:-true}
GetFileNamesInDir(){
  for file in $1
  do
    if [[ $3 != 1 ]]; then
      if [ -f $file ]; then
        if [[ $file == *.tsx ]] || [[ $file == *.js ]] || [[ $file == *.jsx ]]; then
          if [[ $file != */index.js ]];then
            if [[ $2 == 1 ]]; then 
              printf "$(echo $(echo $file | cut -d'/' -f 5) | cut -d'.' -f 1)|"
            else
              if [[ $2 == 2 ]]; then
                printf "$(echo $(echo $file | cut -d'/' -f 6) | cut -d'.' -f 1)|"
              else
                printf "$(echo $(echo $file | cut -d'/' -f 4) | cut -d'.' -f 1)|"
              fi
            fi
          fi
        fi
      fi
    fi
    if [ -d $file ]; then
      if [[ -n "$3" ]]; then
        printf "$(echo $file | cut -d'/' -f 4)|"
      else
        GetFileNamesInDir "$file/*" 2
      fi
    fi
  done
}
FindText (){
  for file in $1
  do
      if [ -f $file ]; then
          if [[ -n "$2" ]]; then
            if grep -q "$2" $file; then
              printf "Found ${GREEN}$2${NC} in $file\n"
            fi
          fi
      fi
      if [ -d $file ]; then
        FindText "$file/*" "$2"
      fi
  done
}

# Optimise Dependencies
printf "Optimising dependencies...\n"
while read -r line; do
  package_content="$package_content$line"
done < "./package.json"
python3 -c "import sys, json; [print(key) for key in json.loads('''$package_content''')['dependencies']]" > ".temp.dependencies.txt"
while read line; do
  if [[ -n "$(FindText "./src/*" "'$line'")$(FindText "./src/*" "\"$line\"")" ]]; then
    if [[ $SHOW_WARNING_ONLY == false ]]; then
      printf "${GREEN}$line${NC} is being used\n"
    fi
  else 
    if [[ "$line" == "react-native-screens" ]]; then
      if [[ $SHOW_WARNING_ONLY == false ]]; then
        printf "${GREEN}react-native-screens${NC} is being used\n"
      fi
    else
      printf "Warning: Package ${YELLOW}$line${NC} is not being used - Let's remove\n"
    fi
  fi
done < ".temp.dependencies.txt"
rm .temp.dependencies.txt

# Optimise Components
printf "Optimising Components...\n"
ComponentContent=$(GetFileNamesInDir "./src/Components/*" 0)
IFS='|' read -ra ADDR <<< "$ComponentContent"
for component in "${ADDR[@]}"; do
  if [[ -n "$component" ]]; then
    if [[ -n "$(FindText "./src/*" "<$component")$(FindText "./src/*" "{$component")$(FindText "./src/*" "$component(")" ]]; then
      if [[ $SHOW_WARNING_ONLY == false ]]; then
        printf "${GREEN}$component${NC} is being used\n"
      fi
    else 
      printf "Warning: Component ${YELLOW}$component${NC} - ./src/Components/$component is not being used - Let's remove\n"
    fi
  fi
done

# Optimise Svg
printf "Optimising Svg Components...\n"
ComponentContent=$(GetFileNamesInDir "./src/Assets/Svg/*" 1)
IFS='|' read -ra ADDR <<< "$ComponentContent"
for component in "${ADDR[@]}"; do
  if [[ -n "$component" ]]; then
    if [[ -n "$(FindText "./src/*" ":$component")$(FindText "./src/*" ": $component")$(FindText "./src/*" "<$component")$(FindText "./src/*" "{$component")$(FindText "./src/*" "$component(")" ]]; then
      if [[ $SHOW_WARNING_ONLY == false ]]; then
        printf "${GREEN}$component${NC} is being used\n"
      fi
    else 
      printf "Warning: Svg ${YELLOW}$component${NC} is not being used - Let's remove\n"
    fi
  fi
done

# Optimise Screens
printf "Optimising Screens...\n"
ComponentContent=$(GetFileNamesInDir "./src/Screens/*" 0 1)
IFS='|' read -ra ADDR <<< "$ComponentContent"
for component in "${ADDR[@]}"; do
  if [[ -n "$component" ]]; then
    if [[ -n "$(FindText "./src/*" ":$component")$(FindText "./src/*" ": $component")$(FindText "./src/*" "<$component")$(FindText "./src/*" "{$component")$(FindText "./src/*" "$component(")" ]]; then
      if [[ $SHOW_WARNING_ONLY == false ]]; then
        printf "${GREEN}$component${NC} is being used\n"
      fi
    else 
      printf "Warning: Screen ${YELLOW}$component${NC} - src/Screens/$component/index.js is not being used - Let's remove\n"
    fi
  fi
done