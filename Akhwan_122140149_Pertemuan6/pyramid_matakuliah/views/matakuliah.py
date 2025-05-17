from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import Matakuliah

@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def list_matakuliah(request):
    return {'matakuliah': [m.to_dict() for m in request.dbsession.query(Matakuliah).all()]}

@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def get_matakuliah(request):
    mk = request.dbsession.query(Matakuliah).get(request.matchdict.get('id'))
    if not mk:
        return HTTPNotFound()
    return {'matakuliah': mk.to_dict()}

@view_config(route_name='matakuliah_create', renderer='json', request_method='POST')
def create_matakuliah(request):
    try:
        data = request.json_body

        # Validasi field wajib
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        if not all(field in data for field in required_fields):
            return HTTPBadRequest(json_body={'error': 'Semua field wajib diisi'})

        # Hapus `id` jika dikirim
        data.pop('id', None)

        # Buat objek Matakuliah
        mk = Matakuliah(**data)
        request.dbsession.add(mk)
        request.dbsession.flush()  # Agar bisa ambil ID yg dibuat otomatis

        return {'message': 'Berhasil', 'matakuliah': mk.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})
        
@view_config(route_name='matakuliah_update', renderer='json', request_method='PUT')
def update_matakuliah(request):
    mk = request.dbsession.query(Matakuliah).get(request.matchdict.get('id'))
    if not mk:
        return HTTPNotFound()

    data = request.json_body
    allowed_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']

    for key in data:
        if key in allowed_fields:
            setattr(mk, key, data[key])

    return {'message': 'Updated', 'matakuliah': mk.to_dict()}

@view_config(route_name='matakuliah_delete', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    mk = request.dbsession.query(Matakuliah).get(request.matchdict.get('id'))
    if not mk:
        return HTTPNotFound()
    request.dbsession.delete(mk)
    return {'message': 'Deleted'}