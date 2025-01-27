echo "building"

npm run build

scp -r dist/* root@ip-172-31-43-198:/var/www/birthday

mkdir newfile

echo  "done building ..."

