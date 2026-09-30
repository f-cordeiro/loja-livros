import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
} from "@mui/material";

import {
    FaCode,
    FaLaptopCode,
    FaHeart,
    FaLandmark,
    FaFlask,
    FaBriefcase,
    FaBrain,
    FaChild,
    FaGraduationCap,
    FaBookOpen,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../css/categorias.css";

const categorias = [
    {
        nome: "Programação",
        descricao:
            "Aprenda programação, lógica e desenvolvimento.",
        busca: "programação",
        icon: <FaCode />,
    },
    {
        nome: "Tecnologia",
        descricao:
            "Explore inovação, informática e tecnologia.",
        busca: "tecnologia",
        icon: <FaLaptopCode />,
    },
    {
        nome: "Romance",
        descricao:
            "Histórias de amor, relacionamentos e emoções.",
        busca: "romance",
        icon: <FaHeart />,
    },
    {
        nome: "História",
        descricao:
            "Conheça acontecimentos e personagens históricos.",
        busca: "história",
        icon: <FaLandmark />,
    },
    {
        nome: "Ciência",
        descricao:
            "Descubra conhecimentos científicos e pesquisas.",
        busca: "ciência",
        icon: <FaFlask />,
    },
    {
        nome: "Negócios",
        descricao:
            "Administração, empreendedorismo e carreira.",
        busca: "negócios",
        icon: <FaBriefcase />,
    },
    {
        nome: "Desenvolvimento Pessoal",
        descricao:
            "Livros para aprendizado e crescimento pessoal.",
        busca: "desenvolvimento pessoal",
        icon: <FaBrain />,
    },
    {
        nome: "Infantil",
        descricao:
            "Histórias e livros para crianças.",
        busca: "livros infantis",
        icon: <FaChild />,
    },
    {
        nome: "Educação",
        descricao:
            "Estudos, ensino e materiais educacionais.",
        busca: "educação",
        icon: <FaGraduationCap />,
    },
    {
        nome: "Literatura",
        descricao:
            "Clássicos, ficção e grandes obras literárias.",
        busca: "literatura",
        icon: <FaBookOpen />,
    },
];

function Categorias() {
    const navigate = useNavigate();

    function selecionarCategoria(busca) {
        navigate(
            `/?categoria=${encodeURIComponent(busca)}`
        );
    }

    return (
        <main className="categorias-page">
            <Container
                maxWidth="xl"
                className="categorias-container"
            >
                {/* HERO */}

                <section className="categorias-hero">
                    <div className="categorias-icon">
                        <FaBookOpen />
                    </div>

                    <Typography
                        component="h1"
                        className="categorias-title"
                    >
                        Explore por{" "}
                        <span>categoria</span>
                    </Typography>

                    <Typography className="categorias-subtitle">
                        Encontre livros de diferentes áreas,
                        gêneros e interesses.
                    </Typography>
                </section>

                {/* GRID */}

                <section className="categorias-grid">
                    {categorias.map(
                        (categoria) => (
                            <Card
                                key={categoria.nome}
                                className="categoria-card"
                            >
                                <CardContent className="categoria-content">
                                    <div className="categoria-icon">
                                        {
                                            categoria.icon
                                        }
                                    </div>

                                    <Typography
                                        component="h2"
                                        className="categoria-title"
                                    >
                                        {
                                            categoria.nome
                                        }
                                    </Typography>

                                    <Typography className="categoria-description">
                                        {
                                            categoria.descricao
                                        }
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() =>
                                            selecionarCategoria(
                                                categoria.busca
                                            )
                                        }
                                        className="categoria-button"
                                    >
                                        Ver livros
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    )}
                </section>
            </Container>
        </main>
    );
}

export default Categorias;