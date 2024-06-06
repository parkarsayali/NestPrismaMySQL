import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { StateService } from './states.services';
import { SuccessError } from 'src/decorators/success-error.decorator';
import { CreateStateDto, UpdateStateDto } from './dto/UpdateState.dto';
import {
  AggregateStateSuccess,
  CountStateSuccess,
  CreateStateSuccess,
  DeleteStateSuccess,
  GroupStateSuccess,
  UpdateStateSuccess,
  findAllStatesSuccess,
  findOneStateSuccess,
} from 'src/shared/constants/messages/success.messages';
import {
  invalidIDError,
  stateNotFoundError,
} from 'src/shared/constants/messages/error.messages';

@Controller('states')
export class StatesController {
  constructor(private readonly stateService: StateService) {}

  /**
   *
   * @returns List of all the states
   */
  @Get()
  @SuccessError()
  async findAll() {
    try {
      const states = await this.stateService.findAll(false); // Default to not including deleted

      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      }; // Return success response
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states including soft-deleted
   */
  @Get('/include-all')
  @SuccessError()
  async findIncludeAll() {
    try {
      const states = await this.stateService.findAll(true);
      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states with Select
   */
  @Get('/select')
  @SuccessError()
  async findAllSelect() {
    try {
      const states = await this.stateService.findAllSelect();
      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states wih Select and OrderBy
   */
  @Get('/selectOrderBy')
  @SuccessError()
  async findAllSelectOrder() {
    try {
      const states = await this.stateService.findAllSelectOrderBy();

      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @returns List of all the states wih included relations and OrderBy
   */
  @Get('/includeOrderBy')
  @SuccessError()
  async findAllIIncludeOrder() {
    try {
      const states = await this.stateService.findAllSelectOrderBy();

      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,

        data: states,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Get('/date')
  @SuccessError()
  async getDate() {
    try {
      const date = await this.stateService.date();

      return {
        statusCode: 200,
        success: true,
        message: 'Retrieved date successfully.',
        data: date,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @returns List of all the states using stored-procedures
   */
  @Get('/sp')
  @SuccessError()
  async getAllSP() {
    try {
      const spData = await this.stateService.getAllSP();
      return {
        statusCode: 200,
        success: true,
        message: findAllStatesSuccess,
        data: spData,
      };
    } catch (error) {
      console.log('SP error', error);
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @param id : state_id
   * @returns A single state
   */
  @Get(':id')
  @SuccessError()
  async findOne(@Param('id') id: string) {
    const parseId = parseInt(id);
    if (isNaN(parseId) || parseId <= 0) {
      return {
        statusCode: 400,
        success: false,
        errorMessage: invalidIDError,
      };
    }

    try {
      const state = await this.stateService.findOne(parseId, false); // Default to not including deleted
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          errorMessage: stateNotFoundError,
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: findOneStateSuccess,
        data: state,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  @Get('/softdeleted/:id')
  @SuccessError()
  async findOneDeleted(@Param('id') id: string) {
    const parseId = parseInt(id);
    try {
      const state = await this.stateService.findOne(parseId, true);
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          message: stateNotFoundError,
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: findOneStateSuccess,
        data: state,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @param id unique parameter
   * @returns unique record based on unique parameter provided
   */
  @Get('id/:id')
  @SuccessError()
  async findUniqueById(@Param('id') id: string) {
    const parseId = parseInt(id);
    try {
      const state = await this.stateService.findUniqueById(parseId, false); // Default to not including deleted
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          message: stateNotFoundError,
        };
      } else {
        return {
          statusCode: 200,
          success: true,
          message: findOneStateSuccess,
          data: state,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @param name unique parameter
   * @returns unique record based on unique parameter provided
   */
  @Get('name/:name')
  @SuccessError()
  async findUniqueByStateName(@Param('name') name: string) {
    try {
      const state = await this.stateService.findUniqueByStateName(name, false); // Default to not including deleted
      console.log('findUnique', state);
      if (!state) {
        return {
          statusCode: 404,
          success: false,
          messages: stateNotFoundError,
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: findOneStateSuccess,
        data: state,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   *
   * @param data create state payload
   * @returns statusCode,success flag,message,data: newly created state
   */
  @Post()
  @SuccessError()
  async create(@Body() data: CreateStateDto) {
    try {
      const newState = await this.stateService.create(data);

      return {
        statusCode: 201,
        success: true,
        message: CreateStateSuccess,
        data: newState,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @param id state_id
   * @param data update payload
   * @returns statusCode,success flag,message,data - updated state
   */
  @Put(':id')
  @SuccessError()
  async update(@Param('id') id: string, @Body() data: UpdateStateDto) {
    try {
      const updatedState = await this.stateService.update(+id, data);

      return {
        statusCode: 200,
        success: true,
        message: UpdateStateSuccess,
        data: updatedState,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @param id state_id
   * @returns statusCode, success,message
   */
  @Delete(':id')
  @SuccessError()
  async delete(@Param('id') id: number) {
    try {
      await this.stateService.delete(+id);
      return {
        statusCode: 200,
        success: true,
        message: DeleteStateSuccess,
        data: {},
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
  /**
   *
   * @param id state_id
   * @returns statusCode,success,message
   */
  @Put('soft-delete/:id')
  @SuccessError()
  async softDelete(@Param('id') id: number) {
    try {
      await this.stateService.softDelete(id);

      return {
        statusCode: 200,
        success: true,
        message: DeleteStateSuccess,
        data: {},
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  /**
   * Endpoint to get the count of states with a fixed alpha code 'LA'.
   * @param res - The response object.
   * @returns A response with the count of states.
   */
  @Get('/count/data')
  @SuccessError()
  async count() {
    try {
      // Call the stateService to get the count of states filtered by the fixed alpha code 'LA'.
      const count = await this.stateService.count({ alpha_code: 'LA' }, {});

      // Return a successful response with the count of states.
      return {
        statusCode: 200,
        success: true,
        message: CountStateSuccess,
        data: count,
      };
    } catch (error) {
      // Handle errors and return an internal server error response.
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Get('/group-by/data')
  @SuccessError()
  async groupBy() {
    try {
      // Define conditions for grouping (e.g., filter to include only non-deleted states).
      const conditions = {};

      // Define the aggregator for grouping:
      // - Group by 'is_deleted'.
      // - Count the number of states in each group.
      const aggregator = {
        by: ['is_deleted'],
        _count: {
          state_id: true,
        },
      };

      // Call the stateService to perform the grouping operation.
      const groupedStates = await this.stateService.groupBy(
        conditions,
        aggregator,
      );

      // Return a successful response with the grouped states.

      return {
        statusCode: 200,
        success: true,
        message: GroupStateSuccess,
        data: groupedStates,
      };
    } catch (error) {
      // Handle errors and return an internal server error response.
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Get('/aggregate/data')
  async aggregate() {
    try {
      // Define the aggregator for aggregation:
      // - Calculate the maximum state_id.
      // - Count the number of country_id.
      // - Filter to include only records where country_id is 0.
      const aggregator = {
        _max: {
          state_id: true,
        },
        _count: {
          country_id: true,
        },
        where: {
          country_id: 1,
        },
      };

      // Perform the aggregation using the stateService
      const aggregationResult = await this.stateService.aggregate(
        {},
        aggregator,
        {},
      );

      // Return a successful response with the aggregation result

      return {
        statusCode: 200,
        success: true,
        message: AggregateStateSuccess,
        data: aggregationResult,
      };
    } catch (error) {
      // Handle errors and return an internal server error response
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
