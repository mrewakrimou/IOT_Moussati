from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from .models import DHT11


def coucou(request):
    return HttpResponse("Hello je suis Ouissal")


def dashboard(request):
    # Rend juste la page; les données sont chargées via JS
    return render(request, "dashboard.html")


def latest_json(request):
    # Utilisation du bon nom de modèle (DHT11) et des bons champs (date_creation, temperature, humidite)
    last = DHT11.objects.order_by('-date_creation').values('temperature', 'humidite', 'date_creation').first()

    if not last:
        return JsonResponse({"detail": "no data"}, status=404)

    return JsonResponse({
        "temperature": last["temperature"],
        "humidity": last["humidite"],
        "timestamp": last["date_creation"].isoformat()
    })