import { sql } from "@/lib/sql";

const args = process.argv.toSpliced(0, 2);

async function migrate() {
  //Create Users Table
  await sql`
    CREATE TABLE IF NOT EXISTS users(
      id TEXT NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      type VARCHAR(10) NOT NULL,
      status VARCHAR(10) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      deleted_at TIMESTAMP,

      CONSTRAINT unique_users_email UNIQUE (email),
      CONSTRAINT unique_users_username UNIQUE (username)
  );
`;

  //Create Session Table
  await sql`
    CREATE TABLE IF NOT EXISTS sessions(
      id TEXT NOT NULL PRIMARY KEY,
      user_id TEXT NOT NULL,
      user_agent VARCHAR(255), 
      ip_address VARCHAR(50),
      expires_at BIGINT NOT NULL,

      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;
}

async function dropTables() {
  await sql`
    SET FOREIGN_KEY_CHECKS = 0; 
    SELECT CONCAT('DROP TABLE IF EXISTS ', table_name, ';') 
    FROM information_schema.tables 
    WHERE table_schema = 'your_database_name'; 
    SET FOREIGN_KEY_CHECKS = 1;
  `;
}

if (args[0] == "up") {
  await migrate();
  console.log("============== Migration completed ==============");
} else if (args[0] == "down") {
  await dropTables();
  console.log("============== Downgrade completed ==============");
}

process.exit(0);
