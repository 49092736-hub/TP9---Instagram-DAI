--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-06-26 12:07:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4800 (class 1262 OID 16398)
-- Name: TP9; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "TP9" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';


ALTER DATABASE "TP9" OWNER TO postgres;

\connect "TP9"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16411)
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    url_imagen character varying,
    descripcion text,
    likes integer,
    fecha_creacion timestamp without time zone,
    usuario_id integer
);


ALTER TABLE public.publicaciones OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16428)
-- Name: publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.publicaciones ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.publicaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_completo character varying,
    nombre_usuario character varying NOT NULL,
    email character varying NOT NULL,
    password character varying,
    foto_perfil character varying,
    biografia text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4793 (class 0 OID 16411)
-- Dependencies: 217
-- Data for Name: publicaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (1, 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 'Mi gato disfrutando del sol', 45, '2026-06-26 12:07:18.484603', 1);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (2, 'https://cdn2.thecatapi.com/images/bpc.jpg', 'La mejor siesta del mundo', 120, '2026-06-26 12:07:18.484603', 2);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (3, 'https://cdn2.thecatapi.com/images/9j5.jpg', 'Siempre me acompaña mientras programo', 87, '2026-06-26 12:07:18.484603', 3);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (4, 'https://cdn2.thecatapi.com/images/6tb.jpg', 'Posando para la foto', 250, '2026-06-26 12:07:18.484603', 4);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (5, 'https://cdn2.thecatapi.com/images/c2b.jpg', 'Modo descanso activado', 63, '2026-06-26 12:07:18.484603', 5);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (6, 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 'Esperando la comida', 98, '2026-06-26 12:07:18.484603', 6);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (7, 'https://cdn2.thecatapi.com/images/bpc.jpg', 'No quiere salir de la cama', 77, '2026-06-26 12:07:18.484603', 7);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (8, 'https://cdn2.thecatapi.com/images/9j5.jpg', 'Mi compañero de trabajo', 132, '2026-06-26 12:07:18.484603', 8);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (9, 'https://cdn2.thecatapi.com/images/6tb.jpg', 'Mirando por la ventana', 54, '2026-06-26 12:07:18.484603', 9);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (10, 'https://cdn2.thecatapi.com/images/c2b.jpg', 'Hora de jugar', 201, '2026-06-26 12:07:18.484603', 10);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (11, 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 'El rey de la casa', 312, '2026-06-26 12:07:18.484603', 11);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (12, 'https://cdn2.thecatapi.com/images/bpc.jpg', 'Cara de pocos amigos', 41, '2026-06-26 12:07:18.484603', 12);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (13, 'https://cdn2.thecatapi.com/images/9j5.jpg', 'Mi mascota favorita', 176, '2026-06-26 12:07:18.484603', 13);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (14, 'https://cdn2.thecatapi.com/images/6tb.jpg', 'Domingo de relax', 82, '2026-06-26 12:07:18.484603', 3);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (15, 'https://cdn2.thecatapi.com/images/c2b.jpg', 'Siempre vigilando', 144, '2026-06-26 12:07:18.484603', 5);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (16, 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 'Le encanta dormir arriba del teclado', 90, '2026-06-26 12:07:18.484603', 8);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (17, 'https://cdn2.thecatapi.com/images/bpc.jpg', 'Un bostezo enorme', 58, '2026-06-26 12:07:18.484603', 2);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (18, 'https://cdn2.thecatapi.com/images/9j5.jpg', 'Preparado para otra siesta', 39, '2026-06-26 12:07:18.484603', 6);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (19, 'https://cdn2.thecatapi.com/images/6tb.jpg', 'Fotogenico como siempre', 167, '2026-06-26 12:07:18.484603', 10);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (20, 'https://cdn2.thecatapi.com/images/c2b.jpg', 'Esperando que vuelva del trabajo', 220, '2026-06-26 12:07:18.484603', 1);


--
-- TOC entry 4792 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (1, 'Juan Perez', 'juanp', 'juan@gmail.com', '123456', 'https://i.pravatar.cc/300?img=1', 'Fanatico de los gatos y la programacion');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (2, 'Maria Gonzalez', 'mariag', 'maria@gmail.com', '123456', 'https://i.pravatar.cc/300?img=2', 'Cat lover');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (3, 'Lucas Fernandez', 'lucasf', 'lucas@gmail.com', '123456', 'https://i.pravatar.cc/300?img=3', 'Desarrollador Full Stack');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (4, 'Sofia Martinez', 'sofiam', 'sofia@gmail.com', '123456', 'https://i.pravatar.cc/300?img=4', 'Fotografa de gatos');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (5, 'Pedro Ramirez', 'pedror', 'pedro@gmail.com', '123456', 'https://i.pravatar.cc/300?img=5', 'Amante de React y Node');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (6, 'Valentina Lopez', 'vale', 'vale@gmail.com', '123456', 'https://i.pravatar.cc/300?img=6', 'Ingeniera en sistemas');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (7, 'Martin Gomez', 'marting', 'martin@gmail.com', '123456', 'https://i.pravatar.cc/300?img=7', 'Backend Developer');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (8, 'Camila Torres', 'camit', 'cami@gmail.com', '123456', 'https://i.pravatar.cc/300?img=8', 'Frontend Developer');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (9, 'Agustin Diaz', 'agusd', 'agustin@gmail.com', '123456', 'https://i.pravatar.cc/300?img=9', 'Estudiante de programacion');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (10, 'Lucia Romero', 'luciar', 'lucia@gmail.com', '123456', 'https://i.pravatar.cc/300?img=10', 'Fan de los gatos negros');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (11, 'Nicolas Castro', 'nicoc', 'nicolas@gmail.com', '123456', 'https://i.pravatar.cc/300?img=11', 'Desarrollador Web');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (12, 'Julieta Silva', 'julis', 'julieta@gmail.com', '123456', 'https://i.pravatar.cc/300?img=12', 'UI Designer');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (13, 'Tomas Herrera', 'tomash', 'tomas@gmail.com', '123456', 'https://i.pravatar.cc/300?img=13', 'Aprendiendo Node.js');


--
-- TOC entry 4801 (class 0 OID 0)
-- Dependencies: 218
-- Name: publicaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicaciones_id_seq', 20, true);


--
-- TOC entry 4802 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 13, true);


--
-- TOC entry 4646 (class 2606 OID 16417)
-- Name: publicaciones publicaciones_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pk PRIMARY KEY (id);


--
-- TOC entry 4640 (class 2606 OID 16406)
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4642 (class 2606 OID 16408)
-- Name: usuarios usuarios_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_unique UNIQUE (nombre_usuario);


--
-- TOC entry 4644 (class 2606 OID 16410)
-- Name: usuarios usuarios_unique_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_unique_1 UNIQUE (email);


--
-- TOC entry 4647 (class 2606 OID 16423)
-- Name: publicaciones publicaciones_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_usuarios_fk FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


-- Completed on 2026-06-26 12:07:53

--
-- PostgreSQL database dump complete
--

