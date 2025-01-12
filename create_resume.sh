#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <version>"
    exit 1
fi

LANG=$1
DATE=$(date +%y%m%d)
TIME=$(date +%H:%M:%S)
TITLE="$DATE"_"$LANG"
JSON=$(cat archetypes/template.json)

cd json/
touch "$TITLE.json" && echo "{ \"meta\" : {\"title\": \"$TITLE\", \"lang\": \"$LANG\", \"version\": \"$DATE\",\"createdTime\": \"$TIME\"}, \"resume\": $JSON }" | jq '.' >"$TITLE.json"

echo "Created new $VERSION at json/$TITLE.json"

# ./create_resume.sh eng
