#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
db_dir='/code-raider-db'
full_db_dir="$parent_path$db_dir"
mongorestore --drop --db code-raider "$full_db_dir"