import {
	lstatSync, PathLike, readdirSync, Stats
} from 'fs';
import path from 'path';

type FileReadCallback = (filename: string) => void;

function readDirectory(directory: string, cb: FileReadCallback): void {
	const files = readdirSync(directory);

	files.forEach(cb);
}

function readFile(filePath: PathLike): Stats {
	return lstatSync(filePath);
}

function getFilePath(directory: string, filename: string): string {
	return path.resolve(directory, filename);
}

function isJSFile(filename: string): boolean {
	return filename.endsWith('.ts') || filename.endsWith('.js');
}

export {
	readDirectory, getFilePath, readFile, isJSFile
};
