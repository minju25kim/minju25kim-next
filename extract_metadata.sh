#!/bin/bash

# Base directory
BASE_DIR="content"

# Current date and time
CURRENT_DATE=$(date +"%Y-%m-%dT%H:%M:%S%z")

# Function to create metadata
create_metadata() {
    local filepath=$1
    local dir=$(dirname "$filepath" | sed "s|$BASE_DIR/||")
    local filename=$(basename "$filepath")
    local title=$(echo "$filename" | sed -E 's/_/ /g; s/.md$//; s/\b\w/\u&/g')
    local output="---\n"
    output+="date: \"$CURRENT_DATE\"\n"
    output+="dir: \"$dir\"\n"
    output+="title: '$title'\n"
    output+="excerpt: \"\"\n"
    output+="keywords: [\"\"]\n"
    output+="coverImage: \"/opengraph-image.png\"\n"
    output+="ogImage:\n  url: \"/opengraph-image.png\"\n"
    output+="---\n"
    echo -e "$output"
}

# Find all markdown files and generate metadata
find "$BASE_DIR" -type f -name "*.md" | while read -r file; do
    metadata=$(create_metadata "$file")
    echo -e "File: $file\n$metadata\n"
done
