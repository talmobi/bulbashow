#!/bin/sh

URL_TEMPLATE="http://media.pldh.net/dreamworld/{NAME}.png"

mkdir tmp
cd tmp && rm *

for i in {1..151}
do
  printf -v name "%03d" $i
  URL=`echo $URL_TEMPLATE | sed "s/{NAME}/$name/"`

  FILE="$name.png"

  if [ ! -f "$FILE" ]; then
    echo "Downloading file... ($URL)"
    curl -s -OL $URL
    echo "Download Complete! ($FILE)"
  else
    echo "Skipping download ($FILE), already exists."
  fi
done
