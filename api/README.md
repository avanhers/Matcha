docker exec -ti mysql mysql -uroot -proot < schema.sql; -> create schema in mysql container
docker exec -ti api node config/populate.js -> populate db