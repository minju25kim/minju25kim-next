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

# Process each markdown file
find "$BASE_DIR" -type f -name "*.md" | while read -r file; do
    metadata=$(create_metadata "$file")
    
    # Check if the file already has metadata
    if ! grep -q "^---" "$file"; then
        # Prepend metadata to the file
        echo -e "$metadata$(cat "$file")" > "$file"
        echo "Metadata added to: $file"
    else
        echo "Metadata already exists in: $file"
    fi
done
