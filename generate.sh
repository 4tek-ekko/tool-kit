#!/bin/bash
# Gerenate project template
# Path: template/generate.sh
# Usage: ./generate.sh
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
NC='\033[0m' # No Color
if [[ $1 == 'component' ]]; then
  if [ -f "./src/Components/$2.tsx" ]; then
    echo "${RED}Component $2 already exists${NC}"
    exit 1
  fi
  touch ./src/Components/$2.tsx
  echo "import React, { memo } from 'react'
import { View } from 'react-native'
import { XStyleSheet } from '@/Theme'
interface $2Props {
  // prop types
}
const $2 = ({}: $2Props) => {
  return <View />
}

export default memo($2)
const styles = XStyleSheet.create({})" > ./src/Components/$2.tsx
echo "export { default as $2 } from './$2'" >> ./src/Components/index.ts
echo "${GREEN}Created $2 component"
echo "${YELLOW}Updated src/Components/index.ts"
fi

if [[ $1 == 'screen' ]]; then
  if [ -d "./src/Screens/$2" ]; then
    echo "${RED}Screen $2 already exists${NC}"
    exit 1
  fi
  mkdir ./src/Screens/$2
  touch ./src/Screens/$2/index.js
  echo "import { AppText, Container } from '@/Components'
import { Colors, XStyleSheet } from '@/Theme'
import React from 'react'

const $2 = () => {
  return (
    <Container style={styles.container}>
      <AppText>$2</AppText>
    </Container>
  )
}

export default $2

const styles = XStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})" > ./src/Screens/$2/index.js
echo "export { default as $2 } from './$2'" >> ./src/Screens/index.js
sed -i '' -e '$ d' ./src/Config/PageName.js
echo "  $2: '$2',
}" >> ./src/Config/PageName.js
echo "${GREEN}Created $2 screen"
echo "${YELLOW}Updated PageName.js"
echo "${YELLOW}Updated src/Screens/index.js"
fi
if [[ $1 == 'store' ]]; then
  if [ -f "./src/Stores/$2.js" ]; then
    echo "${RED}Store $2 already exists${NC}"
    exit 1
  fi
  touch ./src/Stores/$2.js
  echo "import { fetchExample } from '@/Services/Api'
import { makeAutoObservable } from 'mobx'
import { hydrateStore, isHydrated } from 'mobx-persist-store'
import { makePersistExcept } from '@/Utils'
export default class $2 {
  data = []
  constructor() {
    makeAutoObservable(this)
    // makePersist(this, '$2', ['name'])
    makePersistExcept(this, '$2', ['name'])
  }
  //async action
  *fetch() {
    const data = yield fetchExample()
    if (Array.isArray(data)) {
      this.data = data
    }
  }
  //sync action
  reset() {
    this.data = []
  }
  //computed value
  get dataLength() {
    return this.data.length
  }
  // check for hydration (required)
  get isHydrated() {
    return isHydrated(this)
  }
  // hydrate the store (required)
  async hydrateStore() {
    await hydrateStore(this)
  }
}" > ./src/Stores/$2.js
echo -e "import $2 from './$2'\n$(cat ./src/Stores/index.js)" > ./src/Stores/index.js
var_name=`python3 -c "import sys; string='$2';print(string[0].lower() + string[1:]);"`
sed -i '' "s/\/\/\[generate_here]/export const $var_name = new $2()\n\/\/[generate_here]/g" ./src/Stores/index.js
echo "${GREEN}Created $2 store"
echo "${YELLOW}Updated src/Stores/index.js"
fi

if [[ $1 == 'util' ]]; then
  if [ -f "./src/Utils/$2.js" ]; then
    echo "${RED}Util $2 already exists${NC}"
    exit 1
  fi
  touch ./src/Utils/$2.js
  echo "export const funcName = args => {}" > ./src/Utils/$2.js
  echo "export * from './$2'" >> ./src/Utils/index.js
  echo "${GREEN}Created $2 util"
  echo "${YELLOW}Updated src/Utils/index.js"
fi

if [[ $1 == 'model' ]]; then
  if [ -f "./src/Models/$2.js" ]; then
    echo "${RED}Model $2 already exists${NC}"
    exit 1
  fi
  touch ./src/Models/$2.js
  echo "export const ModelName = {}" > ./src/Models/$2.js
  echo "export * from './$2'" >> ./src/Models/index.js
  echo "${GREEN}Created $2 model"
  echo "${YELLOW}Updated src/Models/index.js"
fi

if [[ $1 == 'language' ]]; then
  if [ -f "./src/Translations/Resources/$2.js" ]; then
    echo "${RED}Language Resource $2 already exists${NC}"
    exit 1
  fi
  touch ./src/Translations/Resources/$2.js
  cat ./src/Translations/Resources/vi.js > ./src/Translations/Resources/$2.js
  sed -i '' "s/\/\/\[generate_here]/$2: typeof resources.$2\n      \/\/[generate_here]/g" ./src/Translations/i18n.d.ts
  echo "${GREEN}Created $2 language resource"
  echo "${YELLOW}Updated src/Translations/i18n.d.ts"
fi