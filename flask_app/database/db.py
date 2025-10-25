from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

# CONFIGURACIÓN DE CONEXIÓN

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


# Regiones y comunas

class Region(Base):
    __tablename__ = "region"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(255), nullable=False)
    comunas = relationship("Comuna", back_populates="region")


class Comuna(Base):
    __tablename__ = "comuna"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(255), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"), nullable=False)
    region = relationship("Region", back_populates="comunas")


class AvisoAdopcion(Base):
    __tablename__ = "aviso_adopcion"
    id = Column(Integer, primary_key=True)
    fecha_ingreso = Column(DateTime, server_default=func.now(), nullable=False)
    comuna_id = Column(Integer, ForeignKey("comuna.id"), nullable=False)
    sector = Column(String(255), nullable=False)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    celular = Column(String(50), nullable=False)
    tipo = Column(String(50), nullable=False)
    cantidad = Column(Integer, nullable=False)
    edad = Column(Integer, nullable=False)
    unidad_medida = Column(String(5), nullable=False)
    fecha_entrega = Column(DateTime, nullable=False)
    descripcion = Column(Text, nullable=False)

    comuna = relationship("Comuna")
    fotos = relationship("Foto", back_populates="aviso", cascade="all, delete-orphan")
    contactos = relationship("ContactarPor", back_populates="aviso", cascade="all, delete-orphan")


class Foto(Base):
    __tablename__ = "foto"
    id = Column(Integer, primary_key=True)
    ruta_archivo = Column(String(255), nullable=False)
    nombre_archivo = Column(String(255), nullable=False)
    aviso_id = Column(Integer, ForeignKey("aviso_adopcion.id"), nullable=False)
    aviso = relationship("AvisoAdopcion", back_populates="fotos")


class ContactarPor(Base):
    __tablename__ = "contactar_por"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)
    identificador = Column(String(255), nullable=False)
    aviso_id = Column(Integer, ForeignKey("aviso_adopcion.id"), nullable=False)
    aviso = relationship("AvisoAdopcion", back_populates="contactos")


class Comentario(Base):
    __tablename__ = "comentario"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, server_default=func.now(), nullable=False)
    aviso_id = Column(Integer, ForeignKey("aviso_adopcion.id"), nullable=False)
    aviso = relationship("AvisoAdopcion")


def _session():
    return SessionLocal()


# Consultas

def get_regiones():
    s = _session()
    try:
        return s.query(Region.id, Region.nombre).order_by(Region.nombre.asc()).all()
    finally:
        s.close()


def get_comunas_por_region(region_id: int):
    s = _session()
    try:
        return s.query(Comuna.id, Comuna.nombre)\
                .filter(Comuna.region_id == region_id)\
                .order_by(Comuna.nombre.asc()).all()
    finally:
        s.close()


def get_ultimos_avisos(limit: int = 5):
    s = _session()
    try:
        sub_foto = s.query(Foto.aviso_id, func.min(Foto.id).label("min_id")).group_by(Foto.aviso_id).subquery()
        q = (s.query(
                AvisoAdopcion.id.label("id"),
                func.date_format(AvisoAdopcion.fecha_ingreso, "%Y-%m-%d %H:%i").label("fecha_hora"),
                AvisoAdopcion.sector, AvisoAdopcion.tipo, AvisoAdopcion.cantidad,
                (func.concat(
                    AvisoAdopcion.edad, " ",
                    func.if_(AvisoAdopcion.unidad_medida == "a", "años",
                             func.if_(AvisoAdopcion.unidad_medida == "m", "meses", AvisoAdopcion.unidad_medida))
                )).label("edad"),
                Comuna.nombre.label("comuna_nombre"),
                Foto.ruta_archivo.label("foto_ruta")
            )
            .join(Comuna, AvisoAdopcion.comuna_id == Comuna.id)
            .outerjoin(sub_foto, sub_foto.c.aviso_id == AvisoAdopcion.id)
            .outerjoin(Foto, (Foto.aviso_id == AvisoAdopcion.id) & (Foto.id == sub_foto.c.min_id))
            .order_by(AvisoAdopcion.fecha_ingreso.desc())
            .limit(limit))
        return [dict(r._mapping) for r in q.all()]
    finally:
        s.close()


def get_listado_avisos(limit: int = 5, offset: int = 0):
    s = _session()
    try:
        total = s.query(func.count(AvisoAdopcion.id)).scalar()
        sub_foto = s.query(Foto.aviso_id, func.min(Foto.id).label("min_id")).group_by(Foto.aviso_id).subquery()
        q = (s.query(
                AvisoAdopcion.id.label("id"),
                func.date_format(AvisoAdopcion.fecha_ingreso, "%Y-%m-%d %H:%i").label("fecha_publicacion"),
                func.date_format(AvisoAdopcion.fecha_entrega, "%Y-%m-%d %H:%i").label("fecha_entrega"),
                Comuna.nombre.label("comuna"),
                AvisoAdopcion.sector,
                (func.concat(
                    AvisoAdopcion.cantidad, " ", AvisoAdopcion.tipo, " ",
                    AvisoAdopcion.edad, " ",
                    func.if_(AvisoAdopcion.unidad_medida == "a", "años",
                             func.if_(AvisoAdopcion.unidad_medida == "m", "meses", AvisoAdopcion.unidad_medida))
                )).label("cantidad_tipo_edad"),
                AvisoAdopcion.nombre.label("contacto_nombre"),
                func.count(Foto.id).label("total_fotos"),
                Foto.ruta_archivo.label("foto_portada")
            )
            .join(Comuna, AvisoAdopcion.comuna_id == Comuna.id)
            .outerjoin(sub_foto, sub_foto.c.aviso_id == AvisoAdopcion.id)
            .outerjoin(Foto, (Foto.aviso_id == AvisoAdopcion.id) & (Foto.id == sub_foto.c.min_id))
            .group_by(AvisoAdopcion.id)
            .order_by(AvisoAdopcion.fecha_ingreso.desc())
            .limit(limit).offset(offset))
        filas = [dict(r._mapping) for r in q.all()]
        return filas, total
    finally:
        s.close()


#Insertar datos

def insert_aviso(comuna_id, sector, nombre, email, celular,
                 tipo, cantidad, edad, unidad_medida, fecha_entrega, descripcion):
    s = _session()
    try:
        nuevo_aviso = AvisoAdopcion(
            comuna_id=int(comuna_id),
            sector=sector.strip(),
            nombre=nombre.strip(),
            email=email.strip(),
            celular=celular.strip(),
            tipo=tipo.strip(),
            cantidad=int(cantidad),
            edad=int(edad),
            unidad_medida=unidad_medida.strip(),
            fecha_entrega=fecha_entrega,
            descripcion=descripcion.strip(),
            fecha_ingreso=datetime.now()
        )
        s.add(nuevo_aviso)
        s.commit()
        aviso_id = nuevo_aviso.id
        print(f"[OK] Aviso insertado con ID {aviso_id}")
        return aviso_id
    except SQLAlchemyError as e:
        s.rollback()
        print("[ERROR] Falló insert_aviso:", e)
        raise e
    finally:
        s.close()


def insert_foto(ruta_archivo, nombre_archivo, aviso_id):
    s = _session()
    try:
        s.add(Foto(ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo, aviso_id=aviso_id))
        s.commit()
    except SQLAlchemyError:
        s.rollback()
        raise
    finally:
        s.close()


def insert_contacto(nombre, identificador, aviso_id):
    s = _session()
    try:
        s.add(ContactarPor(nombre=nombre, identificador=identificador, aviso_id=aviso_id))
        s.commit()
    except SQLAlchemyError:
        s.rollback()
        raise
    finally:
        s.close()


def insert_comentario(aviso_id, nombre, texto):
    s = _session()
    try:
        c = Comentario(
            aviso_id=aviso_id,
            nombre=nombre.strip(),
            texto=texto.strip(),
            fecha=datetime.now()
        )
        s.add(c)
        s.commit()
        return c.id
    except SQLAlchemyError:
        s.rollback()
        raise
    finally:
        s.close()



# Más consultas

def get_aviso_por_id(aviso_id: int):
    s = _session()
    try:
        q = (s.query(AvisoAdopcion, Comuna.nombre.label("comuna"), Region.nombre.label("region"))
               .join(Comuna, AvisoAdopcion.comuna_id == Comuna.id)
               .join(Region, Comuna.region_id == Region.id)
               .filter(AvisoAdopcion.id == aviso_id))
        row = q.first()
        if not row:
            return None
        aviso, comuna, region = row
        d = {c.name: getattr(aviso, c.name) for c in AvisoAdopcion.__table__.columns}
        d["comuna"] = comuna
        d["region"] = region
        return d
    finally:
        s.close()


def get_fotos_por_aviso(aviso_id: int):
    s = _session()
    try:
        rows = s.query(Foto.id, Foto.ruta_archivo, Foto.nombre_archivo)\
                .filter(Foto.aviso_id == aviso_id).all()
        return [tuple(r) for r in rows]
    finally:
        s.close()


def get_contactos_por_aviso(aviso_id: int):
    s = _session()
    try:
        rows = s.query(ContactarPor.id, ContactarPor.nombre, ContactarPor.identificador)\
                .filter(ContactarPor.aviso_id == aviso_id).all()
        return [tuple(r) for r in rows]
    finally:
        s.close()


def get_comentarios(aviso_id):
    s = _session()
    try:
        rows = (s.query(Comentario)
                  .filter_by(aviso_id=aviso_id)
                  .order_by(Comentario.fecha.desc()).all())
        return [dict(id=r.id, nombre=r.nombre, texto=r.texto,
                     fecha=r.fecha.strftime("%Y-%m-%d %H:%M")) for r in rows]
    finally:
        s.close()


# Estadisticas

def stats_por_dia():
    s = _session()
    try:
        rows = (s.query(func.date(AvisoAdopcion.fecha_ingreso).label("dia"),
                        func.count(AvisoAdopcion.id).label("cantidad"))
                  .group_by("dia").order_by("dia").all())
        return [dict(dia=r[0].strftime("%Y-%m-%d"), cantidad=r[1]) for r in rows]
    finally:
        s.close()


def stats_por_tipo():
    s = _session()
    try:
        rows = s.query(AvisoAdopcion.tipo, func.count(AvisoAdopcion.id)).group_by(AvisoAdopcion.tipo).all()
        return [dict(tipo=r[0], cantidad=r[1]) for r in rows]
    finally:
        s.close()


def stats_por_mes_tipo():
    s = _session()
    try:
        rows = (s.query(func.date_format(AvisoAdopcion.fecha_ingreso, "%Y-%m").label("mes"),
                        AvisoAdopcion.tipo, func.count(AvisoAdopcion.id))
                  .group_by("mes", AvisoAdopcion.tipo).order_by("mes").all())
        return [dict(mes=r[0], tipo=r[1], cantidad=r[2]) for r in rows]
    finally:
        s.close()
