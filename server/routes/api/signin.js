const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
module.exports = (app) => {
  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });
  //
  // app.post('/api/counters', function (req, res, next) {
  //   const counter = new Counter();
  //
  //   counter.save()
  //     .then(() => res.json(counter))
  //     .catch((err) => next(err));
  // });

  /*
  *sign Up
   */
  app.post('/api/account/signup',(req, res, next)=>{
    console.log("start");
    const{body}=req;
    const{
      firstName,
      lastName,
      email,
      password
    }=body;
    if(!firstName){
      return res.send({
        success: false,
        message: 'Error: First name cannot be empty'
      });
    }
    if(!lastName){
      return res.send({
        success: false,
        message: 'Error: Last name cannot be empty'
      });
    }
    if(!email){
      return res.send({
        success: false,
        message: 'Error: Email cannot be empty'
      });
    }
    if(!password){
      return res.send({
        success: false,
        message: 'Error: Password cannot be empty'
      });
    }
    let emaill =email.toLowerCase();
    //verify email does not exist
    User.find({
      email: emaill
    }, (err,previousUsers) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      else if(previousUsers.length>0){
        return res.send({
          success: false,
          message: 'Error: Account already exist'
        });
      }

      //save new user
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = User.generateHash(password);
      newUser.save((err,user)=>{
          if(err){
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });

  });
  app.post('/api/account/signin',(req, res, next)=> {
    console.log("start");
    const {body} = req;
    const {
      password
    } = body;
    const{
      email
    }=body;
    if(!email){
      return res.send({
        success: false,
        message: 'Error: Email cannot be empty'
      });
    }
    if(!password){
      return res.send({
        success: false,
        message: 'Error: Password cannot be empty'
      });
    }
    let emaill =email.toLowerCase();

    User.find({
      email: emaill
    },(err,users)=>{
      if(err){
        return res.send ({
          success: false,
          message: "Error: server error"
        });
      }
      if(users.length!==1){
        return res.send ({
          success: false,
          message: "Error: invalid"
        });
      }
      const user = users[0];
      if(!user.validPassword(password)){
        return res.send ({
          success: false,
          message: "Error: invalid"
        });
      }
      //otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err,doc)=>{
        if(err){
          return res.send ({
            success: false,
            message: "Error: server error"
          });
        }
        return res.send({
          success: true,
          message:"Valid sign in",
          token: doc._id
        });
      });
    });
  });
  app.get('/api/account/verify',(req, res, next)=> {
    //get the token
    const{query} = req;
    const{token} = query;
    //?token=test
    //verify the token is one of a kind and it's not deleted

    UserSession.find({
      _id: token,
      isDeleted: false
    },(err,sessions)=>{
      if(err){
        return res.send({
          success: false,
          message: "error: server error"
        });
      }
      if(sessions.length!==1){
        return res.send({
          success: false,
          message: "error: Invalid"
        });
      }
      else{
        return res.send({
          success: true,
          message: "Good"
        });
      }
    });
  });
  app.get('/api/account/logout',(req, res, next)=> {
    //get the token
    const{query} = req;
    const{token} = query;
    //?token=test
    //verify the token is one of a kind and it's not deleted

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    },{
    $set:{isDeleted:true}
    }, null, (err,sessions)=>{
      if(err){
        return res.send({
          success: false,
          message: "error: server error"
        });
      }
      else{
        return res.send({
          success: true,
          message: "Good"
        });
      }
    });
  });

};
