# backend/api/routes_mock.py

from flask import Blueprint, request, jsonify
from datetime import datetime

mock_api = Blueprint("mock_api", __name__)

mock_favorites = []
mock_history = []
favorite_id_counter = 1
history_id_counter = 1

@mock_api.route('/api/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    ingredients = data.get("ingredients", "")
    mood = data.get("mood", "")
    return jsonify({
        "main": f"{ingredients}を使った{mood}料理",
        "sides": ["ごはん", "味噌汁"],
        "description": f"{ingredients}を使って{mood}な料理を提案しました。"
    })

@mock_api.route('/api/favorites', methods=['POST'])
def add_favorite():
    global favorite_id_counter
    item = request.get_json()
    item['id'] = favorite_id_counter
    mock_favorites.append(item)
    favorite_id_counter += 1
    return jsonify({ "id": item['id'], "message": "お気に入りに登録しました。" })

@mock_api.route('/api/favorites', methods=['GET'])
def get_favorites():
    return jsonify(mock_favorites)

@mock_api.route('/api/favorites/<int:item_id>', methods=['DELETE'])
def delete_favorite(item_id):
    global mock_favorites
    mock_favorites = [f for f in mock_favorites if f['id'] != item_id]
    return jsonify({ "message": "削除しました。" })

@mock_api.route('/api/history', methods=['POST'])
def add_history():
    global history_id_counter
    item = request.get_json()
    item['id'] = history_id_counter
    item['date'] = datetime.now().strftime('%Y/%m/%d')
    mock_history.append(item)
    history_id_counter += 1
    return jsonify({ "id": item['id'], "message": "履歴に保存しました。" })

@mock_api.route('/api/history', methods=['GET'])
def get_history():
    return jsonify(mock_history)

@mock_api.route('/api/history', methods=['DELETE'])
def delete_history():
    global mock_history
    mock_history = []
    return jsonify({ "message": "履歴を削除しました。" })
