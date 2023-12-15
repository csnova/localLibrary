const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  //We will return an empty string if Author doesn't have full name
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

//Virtual for authors URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

//Format Dates
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  let birthdate = "Unknown";
  if (this.date_of_birth) {
    birthdate = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return birthdate;
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  let deathdate = "Present";
  if (!this.date_of_birth) {
    deathdate = "Unknown";
  }
  if (this.date_of_death) {
    DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  return deathdate;
});

//Fix Date Formatting in Form
AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});
AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
