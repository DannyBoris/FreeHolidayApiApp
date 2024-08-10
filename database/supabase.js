const { createClient } = require("@supabase/supabase-js");

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

module.exports = { db: supabaseClient };
