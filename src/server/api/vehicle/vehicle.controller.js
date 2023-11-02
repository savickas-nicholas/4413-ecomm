
import _ from 'lodash';

import Vehicle from './vehicle.model';


/* Search for users */
export const getVehicles = async (req, res) => {
  console.log('getUsers query --> ', req.query);
  let query = req.query || {};

  // build query



  // sorting 



  try {
    const count = await User.count(query);
    const users = await User.find(query)
                    .select('-salt -hashedPassword -provider');
    return res.status(200).json({ users, count });
  } catch(err) {
    return handleError(res, err);
  }
};


/* get all data for one user */
export const getVehicle = (req, res) => {
  User.findById(req.params.id)
    .select('-salt -hashedPassword -provider')
    .populate({
      path: 'profile',
      populate: {
        path: 'image'
      }
    })
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch(err => handleError(res, err))
};


/* Used to create a new database entry for a User (also returns JWT for auth)
*  Password
*  Name
*  Email
*/
export const addVehicle = async (req, res) => {
  /* should perform validation of 'req.body' fields (e.g. must have Name/Email/Password) */


  
  try {
    let count = await User.count();
    let userObj = {
      provider: 'local',
      role: 'user'
    };
    if(count < 1) {
      userObj.role = 'admin';
    };
    let newUser = _.merge(userObj, req.body);
    console.log('newUser --> ', newUser);
    let user = await User.create(newUser);
    console.log('user --> ', user);
    let token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: '5h' });
    return res.status(201).json({ token, user });
  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/* delete a User */
export const deleteVehicle = (req, res) => {
  User.findOneAndRemove({_id: req.params._id})
  .then((user) => {
    return res.status(200).end();
  }).catch((err) => res.status(500).send(err))
};



function handleError(res, err) {
  console.log('user handleError --> ', err);
  return res.status(500).send(err);
}
