from sqlalchemy.orm import configure_mappers
from .meta import Base
from .matakuliah import Matakuliah

__all__ = ['Base', 'Matakuliah']

# Jika kamu ingin menambahkan model lain, cukup tambahkan baris berikut:
# from .namamodel import NamaModel

# Konfigurasi mapper SQLAlchemy setelah semua model di-import
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    """Buat engine database dari konfigurasi."""
    from sqlalchemy import engine_from_config
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    """Buat session factory SQLAlchemy."""
    from sqlalchemy.orm import sessionmaker
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Buat sesi SQLAlchemy yang terhubung ke transaction manager.
    """
    dbsession = session_factory()
    import zope.sqlalchemy
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Fungsi yang dipanggil oleh Pyramid saat config.include('pyramid_matakuliah.models').
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    # Aktifkan pyramid_tm dan pyramid_retry
    config.include('pyramid_tm')
    config.include('pyramid_retry')

    # Setup session factory
    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    # Tambahkan request.dbsession
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True
    )