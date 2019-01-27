#!/bin/bash
CONFIG_LOCATION="/var/homebridge/config.json"
OLISTO_URL=https://connect.triggi.com/c/B0wuxnS6T8bvw78oZZ7M
if [ -z "$1" ]
  then
    echo "No argument supplied"
	exit 1
fi

new=$(jq --arg argo "$1" '.platforms = [.platforms[] | select(.platform=="Olisto").triggs += [{"name":$argo,"type":"switch","connecturl":"'$OLISTO_URL'"}]]' $CONFIG_LOCATION)
jq . <<<  "$new"
read -p "Save this new config file? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    cp $CONFIG_LOCATION $CONFIG_LOCATION.bak
    echo "$new" > $CONFIG_LOCATION
    service homebridge restart
fi
