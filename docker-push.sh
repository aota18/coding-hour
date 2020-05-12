#!/bin/bash


docker_account="aota18"
pj_server="chapi"
pj_server_version="1.0"

pj_client="chweb"
pj_client_version="1.0"


cd ./exstack
echo "Docker Build ${docker_account}/${pj_server}:${pj_server_version}..."
docker build -t ${docker_account}/${pj_server} .

echo "Docker Push ${docker_account}/${pj_server}:${pj_server_version}..."
docker push ${docker_account}/${pj_server}

cd ../rastack/coding-hour

echo "Docker Build ${docker_account}/${pj_client}:${pj_client_version}..."
docker build -t ${docker_account}/${pj_client} .

echo "Docker Push ${docker_account}/${pj_client}:${pj_client_version}..."
docker push ${docker_account}/${pj_client}

cd ../../

# Server connection establishment


# docker image build
serv_addr="13.209.70.185"
ssh -i .secret/amzSeoul.pem ubuntu@13.209.70.185 "$( cat <<'EOT'
echo "SSH Connected to server"
docker -v
sudo docker pull aota18/chapi
sudo docker pull aota18/chweb
sudo docker-compose up
EOT
)"
