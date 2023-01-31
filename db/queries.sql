CREATE TABLE referral(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT,
  description TEXT,
  type TEXT,
  added_by TEXT,
  created_at INTEGER
);

INSERT INTO referral(
  code, description, type, added_by
)
VALUES(
  ${code},
  ${description},
  ${type},
  ${added_by}
);

SELECT code, description, type FROM referrral WHERE id=1;

DROP TABLE referral;

