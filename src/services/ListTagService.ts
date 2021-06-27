import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


export class ListTagService {
    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);
        let tags = await tagsRepositories.find();



        return classToPlain(tags);
    }
}