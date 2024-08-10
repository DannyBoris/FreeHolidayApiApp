const { db } = require("../database/supabase");

exports.saveUser = async (user) => {
  try {
    const { data } = await db.from("users").insert([user]).select("id");
    const { id } = data[0];
    return id;
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (userId) => {
  const { data } = await db.from("users").select("*").eq("id", userId);
  return data[0];
};

exports.getUserByApiKey = async (apiKey) => {
  const { data } = await db
    .from("users")
    .select("*")
    .eq("apiKey", apiKey)
    .select("id");
  return data[0];
};

exports.getUserByEmail = async (email) => {
  const { data } = await db.from("users").select("*").eq("email", email);
  return data[0];
};

exports.updateUser = async (userId, data) => {
  await db.from("users").update(data).eq("id", userId);
};

exports.deleteUser = async (userId) => {
  await db.from("users").delete().eq("id", userId);
};
