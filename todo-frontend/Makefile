.PHONY: build

build:
	docker build $(NOCACHE) -t registry.keyboardcrash/todo-frontend:latest -f Dockerfile.multistage .

docker-build:
	docker build -t TodoApp/todo-frontend:latest -f Dockerfile .

clean:
	rm -rf build node_modules