#!/bin/bash

echo "🚨 Đang xoá các blob chứa secret khỏi toàn bộ Git history..."

# Cài filter-repo nếu chưa có
if ! command -v git-filter-repo &> /dev/null; then
  echo "🔧 Chưa có git-filter-repo, đang cài..."
  sudo apt install -y git-filter-repo || pip install git-filter-repo
fi

# Thực hiện filter-repo theo blob ID
git filter-repo --blob-callback '
def callback(blob, metadata):
    blocked = {
        "6edfe073a6a6adcd317637047fcf5ed305f7fa4f",
        "300b0878a90bdd61de1f571356208430723638ee",
        "8179c140dc5e0bdb8636a04b196905c34ea74324",
        "68951171ab41555d29438ff851e9755c532c1c21",
        "8d2a71b351cd3fb08078ba6b55fdab614cf03af3"
    }
    return blob.id not in blocked
'

echo "✅ Đã xoá blob chứa secrets. Đang push lại..."

git remote remove origin
git remote add origin https://github.com/caohoangphucs/Byterscue.git
git push --force --set-upstream origin main

echo "🎉 Done! Repo đã sạch secrets và push thành công."
