#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <dir_name> <title>"
    exit 1
fi

# Assign arguments to variables
DIR_NAME=$1
TITLE=$2

# Create the new Hugo content and move the file
hugo new --kind "$DIR_NAME" "$DIR_NAME/$TITLE.md"

echo "Created new $TITLE at content/$DIR_NAME/$TITLE.md"


# ./create_mdx.sh $1 $2