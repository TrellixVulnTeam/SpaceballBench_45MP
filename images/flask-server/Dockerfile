FROM python:3.8

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python"]
CMD ["server.py"]

# docker run -d --name flask-server -p 5000:5000 luciantin/flask-server:1.0.0