const { db } = require("../database/supabase");

exports.saveApiRequest = async (body) => {
  try {
    const { data } = await db.from("api_requests").insert([body]).select("*");
    return data[0];
  } catch (err) {
    console.log(err);
  }
};
