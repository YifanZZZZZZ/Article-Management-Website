package com.itheima.controller;

import com.itheima.pojo.Result;
import com.itheima.utils.AliOssUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
public class FileUploadController {
    @PostMapping("/upload")
    public Result<String> upload(MultipartFile file) throws IOException {
        String orignalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID().toString()+orignalFilename.substring(orignalFilename.lastIndexOf("."));
        file.transferTo(new File("/Users/zhangyifan/Desktop/BigEventFiles"+orignalFilename));
        String url = AliOssUtil.uploadFile(filename, file.getInputStream());
        return Result.success(url);
    }
}
