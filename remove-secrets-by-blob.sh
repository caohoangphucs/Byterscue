#!/bin/bash

echo "🔍 Đang dò file chứa secrets từ blob ID..."

# Danh sách blob cần xóa
BLOBS=(
"6edfe073a6a6adcd317637047fcf5ed305f7fa4f"
"300b0878a90bdd61de1f571356208430723638ee"
"8179c140dc5e0bdb8636a04b196905c34ea74324"
"68951171ab41555d29438ff851e9755c532c1c21"
"8d2a71b351cd3fb08078ba6b55fdab614cf03af3"
)

# File tạm chứa danh sách path để xoá
> paths-to-remove.txt

# Tìm các file chứa blob và lưu lại
for blob in "${BLOBS[@]}"; do
    path=$(git rev-list --objects --all | grep "$blob" | awk '{print $2}')
    if [[ -n "$path" ]]; then
        echo "📄 Blob $blob nằm trong file: $path"
        echo "$path" >> paths-to-remove.txt
    else
        echo "⚠️  Không tìm thấy file chứa blob $blob"
    fi
done

echo "🔥 Đang kiểm tra stash..."
stash_count=$(git stash list | wc -l)

if [[ "$stash_count" -gt 0 ]]; then
    echo "⚠️  Đã phát hiện stash! Đang xoá stash cũ..."
    git stash clear
fi

echo "🔥 Đang xoá khỏi Git history..."
git filter-repo --force --invert-paths --paths-from-file paths-to-remove.txt

echo "✅ Đã xoá secrets thành công khỏi lịch sử Git!"
echo "📤 Bây giờ bạn có thể push lại:"
echo "    git push --force --set-upstream origin main"
