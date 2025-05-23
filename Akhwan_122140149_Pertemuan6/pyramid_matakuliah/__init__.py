from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        
        # Tambahkan ini:
        config.add_static_view(name='static', path='pyramid_matakuliah:static')

        config.scan()
    return config.make_wsgi_app()