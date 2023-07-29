const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
//import schemas
const UserModel = require("./user");
const MagazineModel = require("./magazine");
const ResearchModel = require("./research");
const IssueModel = require("./issue");
//createa models
const User = UserModel(db, Sequelize);
const Magazine = MagazineModel(db, Sequelize);
const Research = ResearchModel(db, Sequelize);
const Issue = IssueModel(db, Sequelize);
//define relationships
//Magazine & Issue relationships (one to many)
Magazine.hasMany(Issue, { as: "nums" });
Issue.belongsTo(Magazine);
//Issue & Researches relationships (one to many)
Issue.hasMany(Research, { as: "Researches" });
Research.belongsTo(Issue);
//generate tables in DB
db.sync({ force: false }).then(() => {
  console.log("Tables Created");
});

module.exports = { User, Magazine, Research, Issue };
