import User from "../Models/user";
import bcrypt from "bcrypt";
import session from "express-session";

export const getJoin = (req, res) => {
    return res.render("join.pug", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const { email, nickname, password } = req.body;
    const exists = await User.exists({ email: email });
    if(exists){
        return res.status(400).render("join.pug", { pageTitle: "Join", errorMessage: "Email ulready exist" });
    }
    await User.create({
        email,
        nickname,
        password
    })
    return res.redirect("/login");
}

export const getLogin = (req, res) => {
    return res.render("login.pug", { pageTitle: "Login" })
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body
    //email 검증 로직
    const user = await User.findOne({ email: email })
    if(!user){
        return res.status(400).render("login.pug", { pageTitle: "Login", errorMessage: "Account does not exist" })
    }
    //password 검증 로직
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if(!passwordCorrect){
        return res.status(400).render("login.pug", { pageTitle: "Wrong password!" })
    }
    req.session.loginState = true ;
    req.session.user = user.nickname;
    return res.redirect("/")
}

export const getLogout = async (req, res) => {
    const session = req.session;
    if(session.user){
        await req.session.destroy(function() {
            req.session
        })
        return res.redirect('/');
    } else {
        return res.redirect('/', { errorMessage: " Session does not exist"});
    }
    /* 아래 코드는 인터넷에서 긁어온 코드인데 뭔가 이 코드가 오류 제어가능해서 더 좋아보임. 근데 
        Error: Cannot set headers after they are sent to the client 오류가 있음. 
        해결 못해서 그냥 위 코드로 작동함.

    try {
        if (session.user) { //세션정보가 존재하는 경우
            await req.session.destroy(function (err) {
                if (err)
                    console.log(err)
                else {
                  return res.redirect('/');
                }
            })
        }
    }
    catch (e) {
      console.log(e)
    }
    return res.redirect('/');*/ 
}

export const getProfile = async (req, res) => {
    const nickname = req.session.user;
    const user = await User.findOne({ nickname: nickname })
    const userNickname = user.nickname
    const userEmail = user.email
    return res.render("myProfile.pug", { pageTitle: "Edit Profile", userNickname, userEmail })
}

export const postProfile = async (req, res) => {
    const userNickname = req.session.user; //user nickname
    const user = await User.findOne({nickname: userNickname})
    const id = user._id
    const userEmail = user.email;
    const nickname = req.body.nickname;
    const password = req.body.password;
    if(nickname){
        await User.findOneAndUpdate(id, {
            nickname: nickname,
        });
        req.session.user = nickname;
    };
    if(password){
        await User.findOneAndUpdate(id, {
            password: password,
        });
    }
    return res.redirect("/my-profile");
}