#!/bin/bash

# 定义要删除的文件列表
files_to_delete=(
  "app/api/webhooks/stripe/route.ts"
  "app/api/users/stripe/route.ts"
  "lib/stripe.ts"
)

# 切换到项目根目录 (根据需要调整路径)
# cd /c/Users/欢欢/Desktop/taxonomy-main

# 循环删除文件
for file in "${files_to_delete[@]}"; do
  if [ -f "$file" ]; then
    echo "正在删除文件: $file"
    rm "$file"
    if [ $? -eq 0 ]; then
      echo "文件删除成功: $file"
    else
      echo "错误：删除文件失败: $file"
    fi
  else
    echo "警告：文件不存在，跳过删除: $file"
  fi
done

echo "文件删除脚本执行完毕。" 