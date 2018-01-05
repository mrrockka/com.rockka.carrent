CREATE TABLE site_user (
    client_id INT,
    user_role varchar(10) NOT NULL,
    nickname varchar(30) NOT NULL,
    password varchar(100) NOT NULL,
    is_deleted varchar(1) NOT NULL,
    created_at DATE NOT NULL,
    modified_at DATE NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id),
    PRIMARY KEY (client_id)
);