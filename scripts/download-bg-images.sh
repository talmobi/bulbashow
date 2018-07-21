#!/bin/sh

URL_TEMPLATE="http://media.pldh.net/gallery/the493/{NAME}.jpg"

mkdir tmp
cd tmp && rm *

for name in `cat "../../pkmn-gen1.csv" | sed "s/,/ /g"`
do
  echo "$name"
  URL=`echo $URL_TEMPLATE | sed "s/{NAME}/$name/"`

  echo "Downloading file... ($URL)"
  curl -s -OL $URL
  echo "Download Complete! ($name.jpg)"
done
