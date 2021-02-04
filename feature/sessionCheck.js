const sessionCheck = (sess) => {
    if(sess.token_check_ok != "true"){
        return false;
    }
    return true;
}

exports.sessionCheck = sessionCheck;