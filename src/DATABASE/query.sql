DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id SERIAL PRIMARY KEY, 
	usuario VARCHAR(25), 
	url VARCHAR(1000),
	descripcion VARCHAR(255), 
	likes INT DEFAULT 0
);

-- semilla
INSERT INTO posts(usuario,url,descripcion,likes) 
VALUES
('JUANITO','https://plus.unsplash.com/premium_photo-1689974465650-b223928cdc9e','FOTITO JUANITO',2),
('MISHU','https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13','FOTITO MISHU',12),
('DOÑA','https://images.unsplash.com/photo-1720247521923-f531207d23d8','PLAYAAA',22)
;



SELECT * FROM posts;

INSERT INTO posts(usuario,url,descripcion) 
VALUES
('JUANITO','https://plus','FOTITO JUANITO')
;

UPDATE POSTS
SET 
LIKES = LIKES + 1
WHERE id = 1
RETURNING *
;
