// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../schema/userSchema.js";
import sendEmail from "../email/nodemailer.js";
import WelcomeTemplate from "../email/welcomeEmail.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email found from Google"), null);
        }

        // Find or create user
        let user = await User.findOne({
          $or: [{ email }, { googleId: profile.id }],
        });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos?.[0]?.value,
            googleId: profile.id,
          });

          try {
            await sendEmail(
              user.email,
              "Welcome to Elite",
              WelcomeTemplate(user.name),
            );
          } catch (error) {
            console.error("Email failed:", error.message);
          }
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

// Serialize & Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
