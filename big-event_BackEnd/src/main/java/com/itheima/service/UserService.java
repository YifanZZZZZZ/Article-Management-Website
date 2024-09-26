package com.itheima.service;

import com.itheima.pojo.User;

public interface UserService { 
    //根据用户名查询
    User findByUserName(String username);

    //注册
    void register(String username, String password);

    //更新
    void update(User user);

    void updateAvatar(String avatarUrl);

    void updatePwd(String newPwd);
}
