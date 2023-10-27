//import cuid from 'cuid';
//import slug from 'limax';
//import sanitizeHtml from 'sanitize-html';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import config from '../../config/environment';
import User from './user.model';


/* Search for users */
export const getUsers = async (req, res) => {
  console.log('getUsers query --> ', req.query);
  let query = req.query || {};

  // if groupId
  // if eventId

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
export const getUser = (req, res) => {
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


/* Used to create a new database entry for a User (also returns JWT for auth... is this best practise??)
*  Password
*  Name
*  Email
*/
export const addUser = async (req, res) => {
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

// used to retrieve the currently logged-in user via JSON token 
export const getMe = (req, res) => {
  User.findOne({_id: req.user._id})
    .select('-salt -hashedPassword -provider')
    .populate({
      path: 'profile',
      populate: {
        path: 'image'
      }
    })
    .then((user) => { // don't ever give out the password or salt
      if (!user) return res.status(401).send('Unauthorized');
      //console.log('getMe --> ', user);

      return res.status(200).json(user);
    }).catch((err) => res.status(500).send(err))
};

/* delete a User */
export const deleteUser = (req, res) => {
  User.findOneAndRemove({_id: req.params._id})
  .then((user) => {
    return res.status(200).end();
  }).catch((err) => res.status(500).send(err))
};

function handleError(res, err) {
  console.log('user handleError --> ', err);
  return res.status(500).send(err);
}
