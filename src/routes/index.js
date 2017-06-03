import express from 'express';
import * as facebook from '../controllers/facebook.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world, I am chat bot');
});

router.get('/webhook', facebook.getValidateToken);
router.post('/webhook', facebook.getFBMessage);

router.get('/setgreetingtext', facebook.setGreetingText);
router.get('/setgetstartedbutton', facebook.setGetStartedButton);

// Default actions for bot
// router.get('/setgreetingtext', facebook.SetGreetingText);
// router.get('/removegreetingtext', facebook.RemoveGreetingText);

// router.get('/setgetstartedbutton', facebook.SetGetStartedButton);
// router.get('/removegetstartedbutton', facebook.RemoveGetStartedButton);

// router.get('/setpersistentmenu', facebook.SetPersistentMenu);
// router.get('/removepersistentmenu', facebook.RemovePersistentMenu);

// router.get('/maketestinguser', facebook.MakeTestingUser);

export default router;
