-- Create the 'seturi' table
CREATE TABLE IF NOT EXISTS seturi (
    id serial PRIMARY KEY,
    nume_set VARCHAR(100) NOT NULL,
    descriere_set TEXT
);

-- Create the 'asociere_set' table
CREATE TABLE IF NOT EXISTS asociere_set (
    id serial PRIMARY KEY,
    id_set INT NOT NULL,
    id_produs INT NOT NULL,
    FOREIGN KEY (id_set) REFERENCES seturi(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produs) REFERENCES tastaturi(id) ON DELETE CASCADE
);
