--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-07-08 13:53:42

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
-- TOC entry 207 (class 1259 OID 17234)
-- Name: auth_group; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO thedronit;

--
-- TOC entry 206 (class 1259 OID 17232)
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO thedronit;

--
-- TOC entry 3150 (class 0 OID 0)
-- Dependencies: 206
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- TOC entry 209 (class 1259 OID 17244)
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO thedronit;

--
-- TOC entry 208 (class 1259 OID 17242)
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO thedronit;

--
-- TOC entry 3151 (class 0 OID 0)
-- Dependencies: 208
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- TOC entry 205 (class 1259 OID 17226)
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO thedronit;

--
-- TOC entry 204 (class 1259 OID 17224)
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO thedronit;

--
-- TOC entry 3152 (class 0 OID 0)
-- Dependencies: 204
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- TOC entry 211 (class 1259 OID 17252)
-- Name: auth_user; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO thedronit;

--
-- TOC entry 213 (class 1259 OID 17262)
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO thedronit;

--
-- TOC entry 212 (class 1259 OID 17260)
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO thedronit;

--
-- TOC entry 3153 (class 0 OID 0)
-- Dependencies: 212
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- TOC entry 210 (class 1259 OID 17250)
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO thedronit;

--
-- TOC entry 3154 (class 0 OID 0)
-- Dependencies: 210
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- TOC entry 215 (class 1259 OID 17270)
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO thedronit;

--
-- TOC entry 214 (class 1259 OID 17268)
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO thedronit;

--
-- TOC entry 3155 (class 0 OID 0)
-- Dependencies: 214
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- TOC entry 217 (class 1259 OID 17330)
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO thedronit;

--
-- TOC entry 216 (class 1259 OID 17328)
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO thedronit;

--
-- TOC entry 3156 (class 0 OID 0)
-- Dependencies: 216
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- TOC entry 203 (class 1259 OID 17216)
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO thedronit;

--
-- TOC entry 202 (class 1259 OID 17214)
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO thedronit;

--
-- TOC entry 3157 (class 0 OID 0)
-- Dependencies: 202
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- TOC entry 201 (class 1259 OID 17205)
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO thedronit;

--
-- TOC entry 200 (class 1259 OID 17203)
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO thedronit;

--
-- TOC entry 3158 (class 0 OID 0)
-- Dependencies: 200
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- TOC entry 218 (class 1259 OID 17361)
-- Name: django_session; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO thedronit;

--
-- TOC entry 220 (class 1259 OID 17373)
-- Name: web_household_filters; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.web_household_filters (
    id integer NOT NULL,
    "Name" character varying(120) NOT NULL,
    "Image" character varying(100) NOT NULL,
    "For_systems" character varying(50) NOT NULL,
    "Pump" character varying(50) NOT NULL,
    "Tank_capacity" character varying(50) NOT NULL,
    "Additional_options" character varying(50) NOT NULL,
    "PrType" character varying(50) NOT NULL,
    "Application" character varying(50) NOT NULL,
    "Size" character varying(50) NOT NULL,
    "Microtity" character varying(50) NOT NULL,
    "Cartridge_size" character varying(50) NOT NULL,
    "Accession" character varying(50) NOT NULL,
    "Nomenclature" character varying(50) NOT NULL,
    "Color" character varying(50) NOT NULL,
    "About" text NOT NULL,
    "Price" integer NOT NULL,
    "Category" character varying(50) NOT NULL,
    "Vendor" character varying(50) NOT NULL,
    "Status" character varying(50) NOT NULL
);


ALTER TABLE public.web_household_filters OWNER TO thedronit;

--
-- TOC entry 219 (class 1259 OID 17371)
-- Name: web_household_filters_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.web_household_filters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.web_household_filters_id_seq OWNER TO thedronit;

--
-- TOC entry 3159 (class 0 OID 0)
-- Dependencies: 219
-- Name: web_household_filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.web_household_filters_id_seq OWNED BY public.web_household_filters.id;


--
-- TOC entry 222 (class 1259 OID 17394)
-- Name: web_optional_equipment; Type: TABLE; Schema: public; Owner: thedronit
--

CREATE TABLE public.web_optional_equipment (
    id integer NOT NULL,
    "Name" character varying(120) NOT NULL,
    "Image" character varying(100) NOT NULL,
    "Category" character varying(50) NOT NULL,
    "Vendor" character varying(50) NOT NULL,
    "Nomenclature" character varying(50) NOT NULL,
    "PrType" character varying(50) NOT NULL,
    "About" text NOT NULL,
    "Status" character varying(50) NOT NULL,
    "Price" integer NOT NULL
);


ALTER TABLE public.web_optional_equipment OWNER TO thedronit;

--
-- TOC entry 221 (class 1259 OID 17392)
-- Name: web_optional_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: thedronit
--

CREATE SEQUENCE public.web_optional_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.web_optional_equipment_id_seq OWNER TO thedronit;

--
-- TOC entry 3160 (class 0 OID 0)
-- Dependencies: 221
-- Name: web_optional_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thedronit
--

ALTER SEQUENCE public.web_optional_equipment_id_seq OWNED BY public.web_optional_equipment.id;


--
-- TOC entry 2923 (class 2604 OID 17237)
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- TOC entry 2924 (class 2604 OID 17247)
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- TOC entry 2922 (class 2604 OID 17229)
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- TOC entry 2925 (class 2604 OID 17255)
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- TOC entry 2926 (class 2604 OID 17265)
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- TOC entry 2927 (class 2604 OID 17273)
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- TOC entry 2928 (class 2604 OID 17333)
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- TOC entry 2921 (class 2604 OID 17219)
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- TOC entry 2920 (class 2604 OID 17208)
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- TOC entry 2930 (class 2604 OID 17376)
-- Name: web_household_filters id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.web_household_filters ALTER COLUMN id SET DEFAULT nextval('public.web_household_filters_id_seq'::regclass);


--
-- TOC entry 2931 (class 2604 OID 17397)
-- Name: web_optional_equipment id; Type: DEFAULT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.web_optional_equipment ALTER COLUMN id SET DEFAULT nextval('public.web_optional_equipment_id_seq'::regclass);


--
-- TOC entry 3129 (class 0 OID 17234)
-- Dependencies: 207
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: thedronit
--



--
-- TOC entry 3131 (class 0 OID 17244)
-- Dependencies: 209
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: thedronit
--



--
-- TOC entry 3127 (class 0 OID 17226)
-- Dependencies: 205
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (13, 'Can add user', 4, 'add_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (14, 'Can change user', 4, 'change_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (15, 'Can delete user', 4, 'delete_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (16, 'Can view user', 4, 'view_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (17, 'Can add content type', 5, 'add_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (18, 'Can change content type', 5, 'change_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (19, 'Can delete content type', 5, 'delete_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (20, 'Can view content type', 5, 'view_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (21, 'Can add session', 6, 'add_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (22, 'Can change session', 6, 'change_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (23, 'Can delete session', 6, 'delete_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (24, 'Can view session', 6, 'view_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (25, 'Can add household_filters', 7, 'add_household_filters');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (26, 'Can change household_filters', 7, 'change_household_filters');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (27, 'Can delete household_filters', 7, 'delete_household_filters');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (28, 'Can view household_filters', 7, 'view_household_filters');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (29, 'Can add optional_equipment', 8, 'add_optional_equipment');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (30, 'Can change optional_equipment', 8, 'change_optional_equipment');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (31, 'Can delete optional_equipment', 8, 'delete_optional_equipment');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (32, 'Can view optional_equipment', 8, 'view_optional_equipment');


--
-- TOC entry 3133 (class 0 OID 17252)
-- Dependencies: 211
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (1, 'pbkdf2_sha256$216000$rTqPcM6435aN$4p5ulE80lRXdgMhTJHf2tiIS5ksEIXmEUFRdEhzYfvo=', '2021-07-04 22:09:32.417086+10', true, 'admin', '', '', 'admin@admin.adminov', true, true, '2021-07-01 12:53:12.144197+10');


--
-- TOC entry 3135 (class 0 OID 17262)
-- Dependencies: 213
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: thedronit
--



--
-- TOC entry 3137 (class 0 OID 17270)
-- Dependencies: 215
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: thedronit
--



--
-- TOC entry 3139 (class 0 OID 17330)
-- Dependencies: 217
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (1, '2021-07-04 16:03:24.385058+10', '1', 'test', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (2, '2021-07-04 16:03:35.346337+10', '1', 'test', 3, '', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (3, '2021-07-04 22:12:26.316976+10', '2', 'Колба фильтра Aquapro AQF1050-X', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (4, '2021-07-04 22:13:45.785481+10', '2', 'Колба фильтра Aquapro AQF1050-X', 2, '[]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (5, '2021-07-04 22:14:25.885039+10', '3', 'Колба фильтра Aquapro AQF1050C (прозрач.)', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (6, '2021-07-04 22:14:55.67856+10', '2', 'Колба фильтра Aquapro AQF1050-X', 2, '[{"changed": {"fields": ["Price"]}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (7, '2021-07-04 22:15:14.596429+10', '3', 'Колба фильтра Aquapro AQF1050C (прозрач.)', 2, '[{"changed": {"fields": ["Price"]}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (8, '2021-07-04 22:16:43.929712+10', '4', 'Колба фильтра Aquapro AQF2050-X', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (9, '2021-07-04 22:17:36.377417+10', '5', 'олба фильтра Aquapro AQF2050C-X (прозрач.)', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (10, '2021-07-04 22:29:53.566733+10', '5', 'Колба фильтра Aquapro AQF2050C-X (прозрач.)', 2, '[{"changed": {"fields": ["\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"]}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (11, '2021-07-04 22:29:59.825259+10', '5', 'Колба фильтра Aquapro AQF2050C-X (прозрач.)', 2, '[]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (12, '2021-07-04 23:30:29.112487+10', '3', 'Колба фильтра Aquapro AQF1050C (прозрач.)', 2, '[{"changed": {"fields": ["\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c"]}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (13, '2021-07-04 23:30:34.785439+10', '3', 'Колба фильтра Aquapro AQF1050C (прозрач.)', 2, '[]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (14, '2021-07-04 23:30:40.778722+10', '4', 'Колба фильтра Aquapro AQF2050-X', 2, '[{"changed": {"fields": ["\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c"]}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (15, '2021-07-04 23:30:44.824231+10', '3', 'Колба фильтра Aquapro AQF1050C (прозрач.)', 2, '[]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (16, '2021-07-04 23:30:48.338851+10', '3', 'Колба фильтра Aquapro AQF1050C (прозрач.)', 2, '[]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (17, '2021-07-04 23:30:52.620127+10', '5', 'Колба фильтра Aquapro AQF2050C-X (прозрач.)', 2, '[{"changed": {"fields": ["\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c"]}}]', 7, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (18, '2021-07-04 23:30:56.727284+10', '2', 'Колба фильтра Aquapro AQF1050-X', 2, '[{"changed": {"fields": ["\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c"]}}]', 7, 1);


--
-- TOC entry 3125 (class 0 OID 17216)
-- Dependencies: 203
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.django_content_type (id, app_label, model) VALUES (1, 'admin', 'logentry');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (2, 'auth', 'permission');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (3, 'auth', 'group');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (4, 'auth', 'user');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (6, 'sessions', 'session');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (7, 'web', 'household_filters');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (8, 'web', 'optional_equipment');


--
-- TOC entry 3123 (class 0 OID 17205)
-- Dependencies: 201
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'contenttypes', '0001_initial', '2021-07-01 12:52:40.706407+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'auth', '0001_initial', '2021-07-01 12:52:40.978897+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'admin', '0001_initial', '2021-07-01 12:52:41.678527+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'admin', '0002_logentry_remove_auto_add', '2021-07-01 12:52:41.833742+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'admin', '0003_logentry_add_action_flag_choices', '2021-07-01 12:52:41.874593+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'contenttypes', '0002_remove_content_type_name', '2021-07-01 12:52:41.900142+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'auth', '0002_alter_permission_name_max_length', '2021-07-01 12:52:41.908141+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'auth', '0003_alter_user_email_max_length', '2021-07-01 12:52:41.916142+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'auth', '0004_alter_user_username_opts', '2021-07-01 12:52:41.923748+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0005_alter_user_last_login_null', '2021-07-01 12:52:41.932763+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0006_require_contenttypes_0002', '2021-07-01 12:52:41.933878+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0007_alter_validators_add_error_messages', '2021-07-01 12:52:41.942892+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0008_alter_user_username_max_length', '2021-07-01 12:52:42.06569+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0009_alter_user_last_name_max_length', '2021-07-01 12:52:42.073699+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'auth', '0010_alter_group_name_max_length', '2021-07-01 12:52:42.092335+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'auth', '0011_update_proxy_permissions', '2021-07-01 12:52:42.09933+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'auth', '0012_alter_user_first_name_max_length', '2021-07-01 12:52:42.107329+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'sessions', '0001_initial', '2021-07-01 12:52:42.161856+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'web', '0001_initial', '2021-07-04 15:41:00.259631+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'web', '0002_auto_20210704_1603', '2021-07-04 16:03:17.736637+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'web', '0003_auto_20210704_1619', '2021-07-04 16:19:18.087599+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'web', '0004_auto_20210704_2158', '2021-07-04 21:58:14.828986+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'web', '0005_auto_20210704_2213', '2021-07-04 22:13:18.555882+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'web', '0006_household_filters_category', '2021-07-04 22:24:19.103332+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'web', '0007_auto_20210704_2328', '2021-07-04 23:28:52.851906+10');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'web', '0008_auto_20210707_1650', '2021-07-07 16:50:38.873296+10');


--
-- TOC entry 3140 (class 0 OID 17361)
-- Dependencies: 218
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('d38h55he5v4hs5y46n25rqn1rhibvojw', '.eJxVjMEOwiAQRP-FsyGwRVg8evcbCAuLVA1NSnsy_rtt0oMeZ96beYsQ16WGtfMcxiwuQovTb0cxPbntID9iu08yTW2ZR5K7Ig_a5W3K_Loe7t9Bjb1ua2dcJPAAjCr6pIuinCgPBggLJjCgNKozYik8oM-WrcPkjdcO7ZbE5wveqjeS:1lympf:A9brbrKVvzs9vUnD6jqZ5qtoaDjmh1UAMaS7nPe1PG4', '2021-07-15 12:53:39.053641+10');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('9lj24lr6q83d0vlmchvzu9ufrlu4xl9m', '.eJxVjMEOwiAQRP-FsyGwRVg8evcbCAuLVA1NSnsy_rtt0oMeZ96beYsQ16WGtfMcxiwuQovTb0cxPbntID9iu08yTW2ZR5K7Ig_a5W3K_Loe7t9Bjb1ua2dcJPAAjCr6pIuinCgPBggLJjCgNKozYik8oM-WrcPkjdcO7ZbE5wveqjeS:1m00wG:z2v8JISDfEeINcS7TFi66jXYHcV2OEOQgPnQVlEb1u8', '2021-07-18 22:09:32.445147+10');


--
-- TOC entry 3142 (class 0 OID 17373)
-- Dependencies: 220
-- Data for Name: web_household_filters; Type: TABLE DATA; Schema: public; Owner: thedronit
--

INSERT INTO public.web_household_filters (id, "Name", "Image", "For_systems", "Pump", "Tank_capacity", "Additional_options", "PrType", "Application", "Size", "Microtity", "Cartridge_size", "Accession", "Nomenclature", "Color", "About", "Price", "Category", "Vendor", "Status") VALUES (4, 'Колба фильтра Aquapro AQF2050-X', 'householdfilters/ba4a085529a52ecc24227f19ae00ffcc.jpg', '', '', '', '', '', 'На холодную воду', 'BB 20', '', '', '1"', 'Колбы', 'Синий', '', 3803, '191', 'Aquapro', '');
INSERT INTO public.web_household_filters (id, "Name", "Image", "For_systems", "Pump", "Tank_capacity", "Additional_options", "PrType", "Application", "Size", "Microtity", "Cartridge_size", "Accession", "Nomenclature", "Color", "About", "Price", "Category", "Vendor", "Status") VALUES (3, 'Колба фильтра Aquapro AQF1050C (прозрач.)', 'householdfilters/a31174b148934ceb056dac23949fc21d.jpg', '', '', '', '', '', 'На холодную воду', 'BB 10', '', '', '1"', 'Колбы', 'Прозрачный', '', 2976, '191', 'Aquapro', '');
INSERT INTO public.web_household_filters (id, "Name", "Image", "For_systems", "Pump", "Tank_capacity", "Additional_options", "PrType", "Application", "Size", "Microtity", "Cartridge_size", "Accession", "Nomenclature", "Color", "About", "Price", "Category", "Vendor", "Status") VALUES (5, 'Колба фильтра Aquapro AQF2050C-X (прозрач.)', 'householdfilters/cf610c3a353738f44a38eb0b460675c9.jpg', '', '', '', '', '', 'На холодную воду', 'BB 20', '', '', '1"', 'Колбы', 'Прозрачный', '', 6414, '191', 'Aquapro', '');
INSERT INTO public.web_household_filters (id, "Name", "Image", "For_systems", "Pump", "Tank_capacity", "Additional_options", "PrType", "Application", "Size", "Microtity", "Cartridge_size", "Accession", "Nomenclature", "Color", "About", "Price", "Category", "Vendor", "Status") VALUES (2, 'Колба фильтра Aquapro AQF1050-X', 'householdfilters/598203df2138c58f22a77758003b7188.jpg', '', '', '', '', '', 'На холодную воду', 'BB 10', '', '', '1"', 'Колбы', 'Синий', '', 2945, '191', 'Aquapro', '');


--
-- TOC entry 3144 (class 0 OID 17394)
-- Dependencies: 222
-- Data for Name: web_optional_equipment; Type: TABLE DATA; Schema: public; Owner: thedronit
--



--
-- TOC entry 3161 (class 0 OID 0)
-- Dependencies: 206
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- TOC entry 3162 (class 0 OID 0)
-- Dependencies: 208
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- TOC entry 3163 (class 0 OID 0)
-- Dependencies: 204
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 32, true);


--
-- TOC entry 3164 (class 0 OID 0)
-- Dependencies: 212
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- TOC entry 3165 (class 0 OID 0)
-- Dependencies: 210
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- TOC entry 3166 (class 0 OID 0)
-- Dependencies: 214
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- TOC entry 3167 (class 0 OID 0)
-- Dependencies: 216
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 18, true);


--
-- TOC entry 3168 (class 0 OID 0)
-- Dependencies: 202
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 8, true);


--
-- TOC entry 3169 (class 0 OID 0)
-- Dependencies: 200
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 26, true);


--
-- TOC entry 3170 (class 0 OID 0)
-- Dependencies: 219
-- Name: web_household_filters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.web_household_filters_id_seq', 5, true);


--
-- TOC entry 3171 (class 0 OID 0)
-- Dependencies: 221
-- Name: web_optional_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thedronit
--

SELECT pg_catalog.setval('public.web_optional_equipment_id_seq', 1, false);


--
-- TOC entry 2945 (class 2606 OID 17359)
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- TOC entry 2950 (class 2606 OID 17286)
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- TOC entry 2953 (class 2606 OID 17249)
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 2947 (class 2606 OID 17239)
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 17277)
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- TOC entry 2942 (class 2606 OID 17231)
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- TOC entry 2961 (class 2606 OID 17267)
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2964 (class 2606 OID 17301)
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- TOC entry 2955 (class 2606 OID 17257)
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- TOC entry 2967 (class 2606 OID 17275)
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 2970 (class 2606 OID 17315)
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- TOC entry 2958 (class 2606 OID 17353)
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- TOC entry 2973 (class 2606 OID 17339)
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- TOC entry 2935 (class 2606 OID 17223)
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- TOC entry 2937 (class 2606 OID 17221)
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 17213)
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2977 (class 2606 OID 17368)
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- TOC entry 2980 (class 2606 OID 17381)
-- Name: web_household_filters web_household_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.web_household_filters
    ADD CONSTRAINT web_household_filters_pkey PRIMARY KEY (id);


--
-- TOC entry 2982 (class 2606 OID 17402)
-- Name: web_optional_equipment web_optional_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.web_optional_equipment
    ADD CONSTRAINT web_optional_equipment_pkey PRIMARY KEY (id);


--
-- TOC entry 2943 (class 1259 OID 17360)
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- TOC entry 2948 (class 1259 OID 17297)
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- TOC entry 2951 (class 1259 OID 17298)
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- TOC entry 2938 (class 1259 OID 17283)
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- TOC entry 2959 (class 1259 OID 17313)
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- TOC entry 2962 (class 1259 OID 17312)
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- TOC entry 2965 (class 1259 OID 17327)
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- TOC entry 2968 (class 1259 OID 17326)
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- TOC entry 2956 (class 1259 OID 17354)
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- TOC entry 2971 (class 1259 OID 17350)
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- TOC entry 2974 (class 1259 OID 17351)
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- TOC entry 2975 (class 1259 OID 17370)
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- TOC entry 2978 (class 1259 OID 17369)
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: thedronit
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- TOC entry 2985 (class 2606 OID 17292)
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2984 (class 2606 OID 17287)
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2983 (class 2606 OID 17278)
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2987 (class 2606 OID 17307)
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2986 (class 2606 OID 17302)
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2989 (class 2606 OID 17321)
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2988 (class 2606 OID 17316)
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2990 (class 2606 OID 17340)
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 2991 (class 2606 OID 17345)
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: thedronit
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


-- Completed on 2021-07-08 13:53:43

--
-- PostgreSQL database dump complete
--

