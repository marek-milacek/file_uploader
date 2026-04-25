const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { db } = require("../db/pool");
const { users } = require("../db/schema");
const bcrypt = require("bcryptjs");
const { eq } = require("drizzle-orm");

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email));

                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, {
                        message: "Incorrect password or email.",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        done(null, user);
    } catch (err) {
        done(err);
    }
});
